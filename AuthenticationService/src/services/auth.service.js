import db from '../config/models/index.model';
import handleUser from '../ultils/handleUser';
import handleJWT from '../ultils/handleJWT';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
const os = require('os')
const expiredIn = +process.env.EXPIRESD_IN;
const secretKey = process.env.SECRET_KEY;

const signUp = async (data) => {
    let t = null;
    try {
        // check user exists;
        let userExists = await db.User.findOne({
            where: {
                codeId: data.codeId,
            }
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
        t = await db.sequelize.transaction();

        let newUser = await db.User.create(data, {
            raw: true
        }, { transaction: t });
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
            // create access token, refresh token
            const access_token = handleJWT.signJwt(userRole, secretKey, expiredIn);
            const refresh_token = uuidv4();
            // save refresh token to db
            const token = await db.Token.create({
                userId: newUser.codeId,
                access_token: access_token,
                refresh_token: refresh_token,
                createdTime: new Date(),
                expiredTime: new Date(new Date().getTime() + expiredIn * 1000)
            }, { transaction: t });
            // save sessions
            const computerName = os.hostname();
            const ipAddress = handleUser.getIPAddress();

            await db.Session.create({
                userId: newUser.codeId,
                ipAddress: ipAddress,
                deviceInfo: computerName,
                loginTime: new Date(),
                logoutTime: new Date(new Date().getTime() + expiredIn * 1000),
                duration: expiredIn,
                tokenId: token.tokenId,
            }, { transaction: t });
            await t.commit();
            return {
                errCode: 0,
                message: 'User created successfully',
                data: {
                    user: handleUser.getUser(userRole),
                    access_token: access_token,
                    refresh_token: refresh_token
                }
            }
        }
        return {
            errCode: 1,
            message: 'Error in creating user'
        }

    } catch (error) {
        await t.rollback();
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

const signIn = async (codeId, password, access_token, refresh_token) => {
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
            raw: true,
            nest: true,
        });
        if (user) {
            const isMatch = handleUser.comparePassword(password, user.password);
            if (isMatch) {
                t = await db.sequelize.transaction();
                const access_token = handleJWT.signJwt(user, secretKey, expiredIn);
                const refresh_token = uuidv4();
                // save sessions
                const computerName = os.hostname();
                const ipAddress = handleUser.getIPAddress();

                const session = await db.Session.findOne({
                    where: {
                        userId: user.codeId,
                        ipAddress: ipAddress,
                        deviceInfo: computerName,
                    }
                });

                if (session) {
                    if (session.logoutTime >= new Date()) {
                        return {
                            errCode: 1,
                            message: 'User is already logged in',
                            data: {
                                user: handleUser.getUser(user),
                                access_token: access_token,
                                refresh_token: refresh_token
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
                            message: 'User found',
                            data: {
                                user: handleUser.getUser(user),
                                access_token: access_token,
                                refresh_token: refresh_token
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
                    message: 'User found',
                    data: {
                        user: handleUser.getUser(user),
                        access_token: access_token,
                        refresh_token: refresh_token
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
                message: 'User not found'
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

module.exports = {
    signUp,
    findUserByCodeId,
    getRolesLimit,
    signIn,
    signOut
}