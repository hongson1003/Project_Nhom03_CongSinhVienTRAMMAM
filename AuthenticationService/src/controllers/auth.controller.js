import authService from "../services/auth.service";
require('dotenv').config();

const signUp = async (req, res, next) => {
    try {
        // validate
        const { codeId, password, roleId } = req.body;
        if (!codeId || !password || !roleId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            });
        }
        // create user
        const response = await authService.signUp(req.body);
        return res.status(201).json(response);
    } catch (error) {
        next(error)
    }
}

const findUserByCodeId = async (req, res, next) => {
    try {
        const { codeId } = req.query;
        if (!codeId) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            });
        }
        const response = await authService.findUserByCodeId(codeId);
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const getRolesLimit = async (req, res, next) => {
    try {
        const limit = +req.query.limit;
        const response = await authService.getRolesLimit(limit);
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}


const signIn = async (req, res, next) => {
    try {
        const authorize = req.headers['authorization'];
        const access_token = authorize.substring(7);
        const refresh_token = req.headers['refresh-token'];
        const { codeId, password } = req.body;
        if (!codeId || !password) {
            return res.status(200).json({
                errCode: 1,
                message: 'Missing required fields'
            });
        }
        const response = await authService.signIn(codeId, password, access_token, refresh_token);
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const signOut = async (req, res, next) => {
    try {
        const user = req.user;
        const response = await authService.signOut(user);
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const reloadPage = async (req, res, next) => {
    try {
        const headers = req.headers;
        const authorization = headers['authorization'];
        const access_token = authorization.substring(7);
        const refresh_token = headers['refresh-token'];
        if (!access_token || !refresh_token) {
            return res.status(401).json({
                errCode: 1,
                message: 'Unauthorized access'
            });
        }
        // refresh token
        const response = await authService.reloadPage(refresh_token);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const createLog = async (req, res, next) => {
    try {
        const { userId, action, description, severity } = req.body;
        if (!userId || !action || !description || !Number.isInteger(severity)) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            });
        }
        const response = await authService.createLog(req.body);
        return res.status(201).json(response);
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const limit = +req.query.limit;
        const user = req.user;
        const response = await authService.getUsers(limit, user);
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signUp,
    findUserByCodeId,
    getRolesLimit,
    signIn,
    signOut,
    reloadPage,
    createLog,
    getUsers
}