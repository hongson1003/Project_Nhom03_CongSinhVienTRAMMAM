const gradeService = require('../services/grade.service');

const createOrUpdateGrade = async (req, res, next) => {
    try {
        const data = req.body;
        const userInfo = req.userInfo;
        const joinClazzId = data.joinClazzId;
        if (!joinClazzId) {
            return res.status(200).json({
                errCode: 400,
                message: 'Missing required parameters'
            })
        }
        const result = await gradeService.createOrUpdateGrade(data, userInfo);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from the server'
        })
    }
}

const getGradeBySemester = async (req, res) => {
    try {
        const semester = req.query.semester;
        const userInfo = req.userInfo;
        if (!semester) {
            return res.status(200).json({
                errCode: 400,
                message: 'Missing required parameters'
            })
        }
        const result = await gradeService.getGradeBySemester(semester, userInfo);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        })
    }
}



module.exports = {
    createOrUpdateGrade, getGradeBySemester
}