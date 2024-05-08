const checkRoleTeacher = (req, res, next) => {
    try {
        const userInfo = req.userInfo;
        const role = userInfo.role;
        if (role.key !== 'TEACHER' && role.key !== 'ADMIN') {
            return res.status(200).json({
                errCode: 403,
                message: 'You do not have permission to access this API'
            })
        }
        next();
    } catch (error) {
        next(error)
    }
}


module.exports = {
    checkRoleTeacher
}