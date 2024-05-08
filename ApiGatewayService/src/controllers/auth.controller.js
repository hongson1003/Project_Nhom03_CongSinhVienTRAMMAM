const { configAuthorize } = require('../config/axios');
const gateway = require('../config/gateway.config.json');
const axios = require('../config/axios').default;

// const axios = require('axios');

const signIn = async (req, res, next) => {
    try {
        const path = req.path;
        const root = gateway.services['authentication-service'].url;

        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;
        var headers = null;
        if (access_token && refresh_token) {
            headers = {
                Authorization: `Bearer ${access_token}`, // Gửi access_token qua header Authorization
                'Refresh-Token': refresh_token // Gửi refresh_token qua header Refresh-Token (nếu cần)
            };
        }
        const authRes = await axios.post(root + path, req.body, { headers });
        if (authRes.errCode === 0) {
            const { access_token, refresh_token, user } = authRes.data;
            res.cookie('access_token', access_token, {
                maxAge: user?.maxAge * 1000,
                secure: false,
                httpOnly: true
            });
            res.cookie('refresh_token', refresh_token, {
                maxAge: user?.maxAge * 1000,
                secure: false,
                httpOnly: true
            });
            res.cookie('user', JSON.stringify(user), {
                maxAge: user?.maxAge * 1000,
                secure: false,
                httpOnly: true
            });
            configAuthorize(access_token, refresh_token, user);
        }
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }
}

const signOut = async (req, res, next) => {
    try {
        const path = req.path;
        const root = gateway.services['authentication-service'].url;

        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;

        if (!access_token) {
            return res.status(400).json({
                errCode: 400,
                message: 'No Authorization'
            });
        }

        const headers = {
            Authorization: `Bearer ${access_token}`, // Gửi access_token qua header Authorization
            'Refresh-Token': refresh_token // Gửi refresh_token qua header Refresh-Token (nếu cần)
        };

        const authRes = await axios.post(root + path, req.body, { headers });
        if (authRes.errCode === 0) {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.clearCookie('user');
            configAuthorize(null, null);
        }
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }
}

const signUp = async (req, res, next) => {
    try {
        const path = req.path;
        const root = gateway.services['authentication-service'].url;
        const authRes = await axios.post(root + path, req.body);
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }
}

const reload = async (req, res, next) => {
    try {
        const path = req.path;
        const root = gateway.services['authentication-service'].url;

        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;

        if (!access_token || !refresh_token) {
            return res.status(400).json({
                errCode: 400,
                message: 'No Authorization'
            });
        }

        const headers = {
            Authorization: `Bearer ${access_token}`, // Gửi access_token qua header Authorization
            'Refresh-Token': refresh_token // Gửi refresh_token qua header Refresh-Token (nếu cần)
        };

        const authRes = await axios.post(root + path, req.body, { headers });
        const { user: userOld } = authRes.data;
        if (authRes.errCode === 100) {
            const { access_token, refresh_token, user } = authRes.data;
            res.cookie('access_token', access_token, {
                maxAge: user.maxAge * 1000 || 1,
                secure: false,
                httpOnly: true
            });
            res.cookie('refresh_token', refresh_token, {
                maxAge: user.maxAge * 1000 || 1,
                secure: false,
                httpOnly: true
            });
            configAuthorize(access_token, refresh_token, user);
        } else {
            configAuthorize(access_token, refresh_token, userOld);
        }
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }

}

const findUserByID = async (req, res, next) => {
    try {
        const codeId = req.query.codeId;
        const root = gateway.services['authentication-service'].url;
        const path = gateway.routes['find-user'].path + `?codeId=${codeId}`;
        const authRes = await axios.get(root + path);
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }
}

const getRolesLimit = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['authentication-service'].url;
        // /api/v1/auth/role?limit=10
        const path = gateway.routes['roles-limit'].path + `?limit=${limit}`;
        const authRes = await axios.get(root + path);
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['authentication-service'].url;
        const path = gateway.routes['get-users'].path + `?limit=${limit}`;
        const authRes = await axios.get(root + path);
        return res.status(200).json(authRes);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    signIn, signOut, signUp, reload, findUserByID, getRolesLimit,
    getUsers
}