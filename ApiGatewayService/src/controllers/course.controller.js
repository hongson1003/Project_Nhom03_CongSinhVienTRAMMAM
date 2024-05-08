const gateway = require('../config/gateway.config.json');
const axios = require('../config/axios').default;

const createNewCourse = async (req, res, next) => {
    try {
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['new-course'].path;
        const courseRes = await axios.post(root + path, req.body);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const getCourses = async (req, res, next) => {
    try {
        const limit = req.query.limit;
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['get-courses'].path + `?limit=${limit}`;
        const courseRes = await axios.get(root + path);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const getCourseById = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['get-course-by-id'].path + `/${courseId}`;
        const courseRes = await axios.get(root + path);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const deleteCourseById = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['delete-course'].path + `/${courseId}`;
        const courseRes = await axios.delete(root + path);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const createCourseDetail = async (req, res, next) => {
    try {
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['new-detail-course'].path;
        const courseRes = await axios.post(root + path, req.body);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }

}

const getSpecializeSemester = async (req, res, next) => {
    try {
        const specializeId = req.query.specializeId;
        if (!specializeId) {
            return res.status(400).json({
                errCode: 400,
                message: 'SpecializeId is required'
            });
        }
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['get-semester-by-specialize'].path + `?specializeId=${specializeId}`;
        const courseRes = await axios.get(root + path);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const getCourseIds = async (req, res, next) => {
    try {
        const ids = req.body.ids;
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['get-course-ids'].path;
        const courseRes = await axios.post(root + path, { ids: ids });
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const createNewSemester = async (req, res, next) => {
    try {
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['new-semester'].path;
        const courseRes = await axios.post(root + path, req.body);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}

const addCourseToSemester = async (req, res, next) => {
    try {
        const root = gateway.services['course-service'].url;
        const path = gateway.routes['add-course-to-semester'].path;
        const courseRes = await axios.post(root + path, req.body);
        return res.status(200).json(courseRes);
    } catch (error) {
        next(error);
    }
}





module.exports = {
    createNewCourse, getCourses, getCourseById, deleteCourseById,
    createCourseDetail, getSpecializeSemester, getCourseIds, createNewSemester,
    addCourseToSemester
}