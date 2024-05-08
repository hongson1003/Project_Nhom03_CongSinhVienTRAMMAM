const { configAuthorize } = require("../config/axios");


const checkUserAuthorize = (req, res, next) => {
    try {
        const userInfo = req.headers['user-info'];
        const refreshToken = req.headers['refresh-token'];
        const accessToken = req.headers['authorization'];

        if (!userInfo || !refreshToken || !accessToken) {
            return res.status(200).json({
                errCode: 400,
                message: 'user-info, refresh-token, authorization are required'
            })
        }

        const userInfoObject = JSON.parse(userInfo);
        if (!userInfoObject || !userInfoObject.codeId) {
            return res.status(200).json({
                errCode: 400,
                message: 'user-info is invalid'
            })
        }

        configAuthorize(accessToken, refreshToken, userInfoObject);
        req.user = userInfoObject;
        next();
    } catch (error) {
        return {
            errCode: 400,
            message: 'user-info is required'
        }
    }

}


module.exports = checkUserAuthorize