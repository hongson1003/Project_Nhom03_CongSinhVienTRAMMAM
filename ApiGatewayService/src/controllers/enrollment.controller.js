const gateway = require('../config/gateway.config.json');
const axios = require('../config/axios').default;

const getCourseRegistersBySemester = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-course-registers'].path + `?semester=${semester}`;
        const enrollRes = await axios(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const newCourseRegister = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-course-register'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const deleteCourseRegister = async (req, res, next) => {
    try {
        const registerId = req.body.registerId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['delete-course-register'].path;
        const enrollRes = await axios.delete(root + path, { data: { registerId } });
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}

const createNewClazz = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-clazz'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getClazzByRegisterId = async (req, res, next) => {
    try {
        const courseRegisterId = req.query.courseRegisterId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-clazzes'].path + `?courseRegisterId=${courseRegisterId}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const deleteClazz = async (req, res, next) => {
    try {
        const clazzId = req.body.clazzId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['delete-clazz'].path;
        const enrollRes = await axios.delete(root + path, { data: { clazzId } });
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getDaysOfWeek = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-days'].path;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getLessions = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-lessions'].path;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const createNewSchedule = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-schedule'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getScheduleByClazzId = async (req, res, next) => {
    try {
        const clazzId = req.query.clazzId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-schedules'].path + `?clazzId=${clazzId}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const createNewEnrollment = async (req, res, next) => {
    try {
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['new-enrollment'].path;
        const enrollRes = await axios.post(root + path, req.body);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}

const deleteEnrollment = async (req, res, next) => {
    try {
        const enrollmentId = req.body.enrollmentId;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['delete-enrollment'].path;
        const enrollRes = await axios.delete(root + path, { data: { enrollmentId } });
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getEnrollments = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-enrollments'].path + `?semester=${semester}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }
}

const getCourseEnrollments = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-all-course-enrollments'].path + `?semester=${semester}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}

const getScheduleMyself = async (req, res, next) => {
    try {
        const week = +req.params.week;
        if (!week) {
            return res.status(400).json({ message: 'Week is required' });
        }
        const root = gateway.services['enrollment-service'].url;
        const path = gateway.routes['get-schedule-by-week'].path + `/${week}`;
        const enrollRes = await axios.get(root + path);
        return res.status(200).json(enrollRes);
    } catch (error) {
        next(error);
    }

}


module.exports = {
    getCourseRegistersBySemester, newCourseRegister, deleteCourseRegister,
    createNewClazz, getClazzByRegisterId, deleteClazz, getDaysOfWeek,
    getLessions, createNewSchedule, getScheduleByClazzId, createNewEnrollment,
    deleteEnrollment, getEnrollments, getCourseEnrollments, getScheduleMyself
}