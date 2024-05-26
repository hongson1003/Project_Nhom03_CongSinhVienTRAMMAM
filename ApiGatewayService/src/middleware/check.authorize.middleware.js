
const checkAuthorize = (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        const refresh_token = req.cookies.refresh_token;
        if (!access_token || !refresh_token) {
            return res.status(400).json({
                errCode: 400,
                message: 'No Authorization'
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = checkAuthorize;