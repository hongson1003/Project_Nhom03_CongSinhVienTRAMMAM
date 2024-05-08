const axios = require('../config/axios').default;
const gateway = require('../config/gateway.config.json');

const createOrUpdateGrade = async (req, res, next) => {
    try {
        const { joinClazzId } = req.body;
        if (!joinClazzId) {
            return res.status(200).json({
                errCode: 404,
                message: 'joinClazzId is required'
            });
        }
        const root = gateway.services['grade-service'].url;
        const path = gateway.routes['create-update-grade'].path;
        const response = await axios.post(root + path, req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getGradeBySemester = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        if (!semester) {
            return res.status(200).json({
                errCode: 404,
                message: 'semester is required'
            });
        }
        const root = gateway.services['grade-service'].url;
        const path = gateway.routes['get-grade-semester'].path + `?semester=${semester}`;
        const response = await axios.get(root + path);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrUpdateGrade, getGradeBySemester
}