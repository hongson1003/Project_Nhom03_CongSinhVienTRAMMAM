import { log } from 'forever';
import db from '../config/models/index.model';
import handleJwt from '../ultils/handleJWT';
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const expiresIn = +process.env.EXPIRESD_IN;
const maxAge = +process.env.MAX_AGE;
const secret = process.env.SECRET_KEY;

const checkJWT = async (req, res, next) => {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;
    try {
        if (!access_token || !refresh_token) {
            return res.status(401).json({
                errCode: 1,
                message: 'Unauthorized access'
            });
        }
        const { data } = await handleJwt.verify(access_token, secret);
        const user = data;
        // check user exist in db

        const userFromDB = await db.User.findOne({
            where: {
                codeId: user.codeId
            }
        });
        if (!userFromDB) {
            return res.status(401).json({
                errCode: 1,
                message: 'Unauthorized access'
            });
        }
        req.user = user;
        req.access_token = access_token;
        req.refresh_token = refresh_token;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // ...do stuff
            const response = await refreshToken(refresh_token);
            if (response.errCode === 0) {
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                const expiryDateLocal = new Date(Date.now() + maxAge * 1000);
                const expiryDateUTC = new Date(expiryDateLocal);
                expiryDateUTC.setMinutes(expiryDateLocal.getMinutes() - expiryDateLocal.getTimezoneOffset());
                res.cookie('access_token', access_token, { expires: expiryDateUTC, httpOnly: true });
                res.cookie('refresh_token', refresh_token, { expires: expiryDateUTC, httpOnly: true });
                return res.status(200).json({
                    errCode: 0,
                    message: 'Token refreshed',
                    data: {
                        user: response.data.user,
                        access_token: access_token,
                        refresh_token: refresh_token
                    }
                })
            } else {
                return res.status(401).json({
                    errCode: 1,
                    message: 'Unauthorized access'
                });
            }
        }
        next(error)
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
            }
        });
        t = await db.sequelize.transaction();
        const access_token = handleJwt.signJwt(user, secret, expiresIn);
        const newRefreshToken = uuidv4();

        const token = await db.Token.create({
            userId: user.codeId,
            access_token: access_token,
            refresh_token: newRefreshToken,
            expiredTime: new Date(new Date().getTime() + expiresIn * 1000),
            createdTime: new Date(),
        }, { transaction: t });

        if (token) {
            const session = await db.Session.update({
                loginTime: new Date(),
                logoutTime: new Date(new Date().getTime() + expiresIn * 1000),
                expiredTime: new Date(new Date().getTime() + expiresIn * 1000)
            }, {
                where: {
                    userId: user.codeId
                }
            });
            if (session) {
                await t.commit();
                return {
                    errCode: 0,
                    message: 'Token refreshed',
                    data: {
                        user: user,
                        access_token: access_token,
                        refresh_token: newRefreshToken
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
        if (t) {
            await t.rollback();
        }
        throw error;
    }
}


module.exports = {
    checkJWT,
    refreshToken
}