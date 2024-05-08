import db from '../config/models/index.model';
import handleUser from '../ultils/handleUser';
import handleJWT from '../ultils/handleJWT';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
const os = require('os')
const expiredIn = +process.env.EXPIRESD_IN;
const secretKey = process.env.SECRET_KEY;
const maxAge = +process.env.MAX_AGE;

const signUp = async (data) => {
    try {
        // check user exists;
        let userExists = await db.User.findOne({
            where: {
                codeId: data.codeId,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'roleId']
            },
        })
        if (userExists)
            return {
                errCode: 1,
                message: 'User is exists, Please use new codeId'
            }
        // hash password
        const passwordHashed = handleUser.hashPassword(data.password);
        data.password = passwordHashed;
        //create new user;

        let newUser = await db.User.create(data, {
            raw: true
        });
        if (newUser) {
            const userRole = await db.User.findOne({
                where: {
                    codeId: newUser.codeId
                },
                raw: true,
                nest: true,
                include: {
                    model: db.Role,
                    as: 'role',
                }
            })
            return {
                errCode: 0,
                message: 'User created successfully',
                data: handleUser.getUser(userRole)
            }
        }
        return {
            errCode: 1,
            message: 'Error in creating user'
        }

    } catch (error) {
        throw error;
    }
}

const findUserByCodeId = async (codeId) => {
    try {
        const user = await db.User.findOne({
            where: {
                codeId: codeId
            },
            include: [
                {
                    model: db.Role,
                    as: 'role',
                }
            ],
            raw: true,
            nest: true,
        });
        if (user) {
            return {
                errCode: 0,
                message: 'User found',
                data: handleUser.getUser(user)
            }
        }
        return {
            errCode: 1,
            message: 'User not found'
        }
    } catch (error) {
        throw error;
    }
}

const getRolesLimit = async (limit) => {
    try {
        const roles = await db.Role.findAll({
            limit: limit
        });
        return {
            errCode: 0,
            message: 'Roles found',
            data: roles
        }
    } catch (error) {
        throw error;
    }
}

const signIn = async (codeId, password, access_token_old, refresh_token_old) => {
    let t = null;
    try {
        const user = await db.User.findOne({
            where: {
                codeId: codeId
            },
            include: [
                {
                    model: db.Role,
                    as: 'role',
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'roleId']
            },
            raw: true,
            nest: true,
        });
        if (user) {
            t = await db.sequelize.transaction();
            const isMatch = handleUser.comparePassword(password, user.password);
            if (isMatch) {
                const access_token = handleJWT.signJwt(handleUser.getUser(user), secretKey, expiredIn, maxAge);
                const refresh_token = uuidv4();
                // save sessions
                const computerName = os.hostname();
                const ipAddress = handleUser.getIPAddress();

                const session = await db.Session.findOne({
                    where: {
                        userId: user.codeId,
                        ipAddress: ipAddress,
                        deviceInfo: computerName,
                    },
                });

                if (session) {
                    if (session.logoutTime >= new Date() && access_token_old && refresh_token_old) {
                        return {
                            errCode: 1,
                            message: 'User is already logged in',
                            data: {
                                user: {
                                    ...handleUser.getUser(user),
                                    expiredIn: expiredIn,
                                    maxAge: maxAge
                                },
                                expiredIn: expiredIn,
                                maxAge: maxAge,
                                access_token: access_token_old,
                                refresh_token: refresh_token_old
                            }
                        }
                    } else {
                        // update token
                        const token = await db.Token.create({
                            userId: user.codeId,
                            access_token: access_token,
                            refresh_token: refresh_token,
                            createdTime: new Date(),
                            expiredTime: new Date(new Date().getTime() + process.env.EXPIRESD_IN * 1000)
                        });
                        // update session
                        await db.Session.update({
                            loginTime: new Date(),
                            logoutTime: new Date(new Date().getTime() + process.env.EXPIRESD_IN * 1000),
                            tokenId: token.tokenId,
                        }, {
                            where: {
                                userId: user.codeId,
                                ipAddress: ipAddress,
                                deviceInfo: computerName,
                            }
                        }, { transaction: t });
                        await t.commit();
                        return {
                            errCode: 0,
                            message: 'Login success',
                            data: {
                                user: {
                                    ...handleUser.getUser(user),
                                    expiredIn: expiredIn,
                                    maxAge: maxAge
                                },
                                access_token: access_token,
                                refresh_token: refresh_token,

                            }
                        }
                    }
                } else {
                    // save refresh token to db
                    const token = await db.Token.create({
                        userId: user.codeId,
                        access_token: access_token,
                        refresh_token: refresh_token,
                        createdTime: new Date(),
                        expiredTime: new Date(new Date().getTime() + expiredIn * 1000)
                    }, { transaction: t });

                    // save session to db
                    await db.Session.create({
                        userId: user.codeId,
                        ipAddress: ipAddress,
                        deviceInfo: computerName,
                        loginTime: new Date(),
                        logoutTime: new Date(new Date().getTime() + expiredIn * 1000),
                        duration: expiredIn,
                        tokenId: token.dataValues.tokenId,
                    }, { transaction: t });
                };

                await t.commit();

                return {
                    errCode: 0,
                    message: 'Login success',
                    data: {
                        user: {
                            ...handleUser.getUser(user),
                            expiredIn: expiredIn,
                            maxAge: maxAge
                        },
                        access_token: access_token,
                        refresh_token: refresh_token,
                    }
                }
            }
            return {
                errCode: 1,
                message: 'Password is incorrect'
            }
        }
        return {
            errCode: 1,
            message: 'User not found'
        }
    } catch (error) {
        console.log(error)
        await t.rollback();
        throw error;
    }
}

const signOut = async (user) => {
    try {
        // delete session
        const result = await db.Session.destroy({
            where: {
                userId: user.codeId
            }
        });

        if (result === 0) {
            return {
                errCode: 1,
                message: 'Wrongs when log out user'
            }
        }
        return {
            errCode: 0,
            message: 'User logged out'
        }
    } catch (error) {
        throw error;
    }

}

const createLog = async (data) => {
    try {
        const deviceInfo = os.hostname();
        const ipAddress = handleUser.getIPAddress();
        const log = await db.Log.create({
            ...data,
            ipAddress,
            deviceInfo,
        });
        return {
            errCode: 0,
            message: 'Log created',
            data: log
        }
    } catch (error) {
        throw error;
    }
}

const getUsers = async (limit, user) => {
    try {
        if (user.role.key === 'ADMIN') {
            const users = await db.User.findAll({
                limit: limit,
                raw: false,
                nest: true,
                attributes: { exclude: ['password'] },
                include: {
                    model: db.Role,
                    as: 'role',
                    attributes: { exclude: ['password'] },
                }
            });

            return {
                errCode: 0,
                message: 'Users found',
                data: users
            }
        }
        return {
            errCode: 1,
            message: 'User is not admin'
        }
    } catch (error) {
        throw error;
    }
}

const refreshToken = async (refresh_token) => {
    var t = null;
    try {
        const tokenOld = await db.Token.findOne({
            where: {
                refresh_token: refresh_token
            }
        })
        if (!tokenOld) {
            return {
                errCode: 1,
                message: 'Unauthorized access'
            }
        };
        const user = await db.User.findOne({
            where: {
                codeId: tokenOld.userId
            },
            include: [
                {
                    model: db.Role,
                    as: 'role',
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'roleId']
            },
            raw: true,
            nest: true,
        });
        t = await db.sequelize.transaction();
        const access_token = handleJWT.signJwt(handleUser.getUser(user), secretKey, expiredIn, maxAge);
        const newRefreshToken = uuidv4();

        const token = await db.Token.create({
            userId: user.codeId,
            access_token: access_token,
            refresh_token: newRefreshToken,
            expiredTime: new Date(new Date().getTime() + expiredIn * 1000),
            createdTime: new Date(),
        }, { transaction: t });

        if (token) {
            const session = await db.Session.update({
                loginTime: new Date(),
                logoutTime: new Date(new Date().getTime() + expiredIn * 1000),
                expiredTime: new Date(new Date().getTime() + expiredIn * 1000)
            }, {
                where: {
                    userId: user.codeId
                }
            });
            if (session) {
                await t.commit();
                return {
                    errCode: 100,
                    message: 'Token refreshed',
                    data: {
                        user: {
                            ...handleUser.getUser(user),
                            expiredIn: expiredIn,
                            maxAge: maxAge
                        },
                        access_token: access_token,
                        refresh_token: newRefreshToken,
                    }
                }
            } else {
                return {
                    errCode: 1,
                    message: 'Token not refreshed'
                }
            }
        }
    } catch (error) {
        console.log(error)
        if (t) {
            await t.rollback();
        }
        throw error;
    }
}

const reloadPage = async (refresh_token) => {
    try {
        const token = await db.Token.findOne({
            where: {
                refresh_token: refresh_token
            }
        });
        if (!token) {
            return {
                errCode: 1,
                message: 'Unauthorized access'
            }
        }
        const access_token = token.access_token;
        const data = handleJWT.verify(access_token, secretKey);
        const user = data.data;
        if (!user) {
            return {
                errCode: 1,
                message: 'Unauthorized access'
            }
        }
        return {
            errCode: 0,
            message: 'Reload page successfully',
            data: {
                user: user,
                access_token: access_token,
                refresh_token: refresh_token
            }
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const refreshRes = await refreshToken(refresh_token);
            return refreshRes;
        }
    }
}

module.exports = {
    signUp,
    findUserByCodeId,
    getRolesLimit,
    signIn,
    signOut,
    createLog,
    getUsers,
    refreshToken,
    reloadPage
}