import authService from "../services/auth.service";
require('dotenv').config();
const maxAge = +process.env.MAX_AGE;

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
        if (response.errCode === 0) {
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            const expiryDateLocal = new Date(Date.now() + maxAge * 1000);
            const expiryDateUTC = new Date(expiryDateLocal);
            expiryDateUTC.setMinutes(expiryDateLocal.getMinutes() - expiryDateLocal.getTimezoneOffset());
            // clear cookies
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            // set cookies
            res.cookie('access_token', access_token, { expires: expiryDateUTC, httpOnly: true })
            res.cookie('refresh_token', refresh_token, { expires: expiryDateUTC, httpOnly: true })
        }
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
        const access_token = req.access_token;
        const refresh_token = req.refresh_token;
        const { codeId, password } = req.body;
        if (!codeId || !password) {
            return res.status(400).json({
                errCode: 1,
                message: 'Missing required fields'
            });
        }
        const response = await authService.signIn(codeId, password, access_token, refresh_token);
        if (response.errCode === 0) {
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            // res.cookie('access_token', access_token, { maxAge: maxAge * 1000, httpOnly: true })
            // res.cookie('refresh_token', refresh_token, { maxAge: maxAge * 1000, httpOnly: true })

            // Tính toán thời gian hết hạn dựa trên múi giờ địa phương (GMT+7)
            const expiryDateLocal = new Date(Date.now() + maxAge * 1000);
            // Chuyển đổi thời gian hết hạn sang UTC bằng cách cộng thêm số phút tương ứng với múi giờ
            const expiryDateUTC = new Date(expiryDateLocal);
            expiryDateUTC.setMinutes(expiryDateLocal.getMinutes() - expiryDateLocal.getTimezoneOffset());

            res.cookie('access_token', access_token, { expires: expiryDateUTC, httpOnly: true })
            res.cookie('refresh_token', refresh_token, { expires: expiryDateUTC, httpOnly: true })
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const signOut = async (req, res, next) => {
    try {
        const user = req.user;
        const response = await authService.signOut(user);
        if (response.errCode === 0) {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const reloadPage = async (req, res, next) => {
    try {
        const access_token = req.access_token;
        const refresh_token = req.refresh_token;
        const user = req.user;
        if (!access_token || !refresh_token) {
            return res.status(401).json({
                errCode: 1,
                message: 'Unauthorized access'
            });
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Reload page successfully',
            data: {
                user,
                access_token,
                refresh_token,
            }
        });
    } catch (error) {
        next(error);
    }
}




module.exports = {
    signUp,
    findUserByCodeId,
    getRolesLimit,
    signIn,
    signOut,
    reloadPage
}