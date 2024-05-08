import { log } from 'forever';
import db from '../config/models/index.model';
import handleJwt from '../ultils/handleJWT';
require('dotenv').config();
const secret = process.env.SECRET_KEY;

// Middleware để xử lý access_token từ header Authorization
const extractAccessToken = async (req, res, next) => {
    var access_token = null;
    var refresh_token = null;
    try {
        const authHeader = req.headers['authorization'];
        refresh_token = req.headers['refresh-token'];
        access_token = authHeader.substring(7);
        if (access_token && refresh_token) {
            req.access_token = access_token
            req.refresh_token = refresh_token;
            // verify jwt
            const { data } = handleJwt.verify(access_token, secret);
            req.user = data;
        }
        next();
    } catch (error) {
        return res.status(401).json({
            errCode: 1,
            message: 'Unauthorized access'
        });
    }
};


module.exports = {
    extractAccessToken
}