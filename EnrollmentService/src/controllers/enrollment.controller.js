const enrollmentService = require('../services/enrollment.service')
const axios = require('../config/axios').default;
require('dotenv').config();
const urlCourse = process.env.URL_COURSE;
const urlInfo = process.env.URL_INFO;

const createNewCourseRegister = async (req, res, next) => {
    try {
        const { courseId, semester } = req.body
        if (!courseId || !semester) {
            return res.status(200).json({
                message: 'courseId and semester are required'
            })
        }

        // check courser Register exists
        const findCourseRegisterRes = await enrollmentService.findCourseRegisterByCourseIdSemester(courseId, semester);
        if (findCourseRegisterRes.errCode === 0) {
            return res.status(200).json({
                errCode: 400,
                message: 'courseId already exists'
            })
        }
        // check courseId exist in database
        const courseRes = await axios.get(urlCourse + '/api/v1/course/' + courseId, {
            headers: {
                'Authorization': req.headers.authorization,
                'User-Info': req.headers['user-info'],
            }
        });
        if (courseRes.errCode !== 0) {
            return res.status(200).json({
                errCode: 404,
                message: 'courseId not exist'
            })
        }
        // code to create a new course register
        const response = await enrollmentService.createNewCourseRegister(courseRes.data, semester);
        return res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getCourseRegisterBySemester = async (req, res, next) => {
    try {
        const { semester } = req.query
        if (!semester) {
            return res.status(200).json({
                message: 'semester is required'
            })
        }
        const courseRegister = await enrollmentService.getCourseRegisterBySemester(semester);
        return res.status(200).json(courseRegister)
    } catch (error) {
        next(error)
    }

}

const deleteCourseRegister = async (req, res, next) => {
    try {
        const { registerId } = req.body
        if (!registerId) {
            return res.status(200).json({
                errCode: 400,
                message: 'registerId is required'
            })
        }
        const courseRegister = await enrollmentService.deleteCourseRegister(registerId);
        return res.status(200).json(courseRegister)
    } catch (error) {
        next(error)
    }

}

const createNewClazz = async (req, res, next) => {
    try {
        const { courseRegisterId, maxQuantity, name, teacherId } = req.body;
        if (!courseRegisterId || !maxQuantity || !name || !teacherId) {
            return res.status(200).json({
                errCode: 400,
                message: 'courseRegisterId, maxQuantity, quantity are required'
            })
        }
        // check teacher exists
        const teacherRes = await axios.get(urlInfo + '/api/v1/teacher/' + teacherId);
        if (teacherRes.errCode !== 0) {
            return res.status(200).json({
                errCode: 404,
                message: 'teacherId not exist'
            })
        }

        const response = await enrollmentService.createNewClazz(courseRegisterId, maxQuantity, name, teacherId);
        return res.status(201).json(response);
    } catch (error) {
        next(error)
    }
}

const getClazzByCourseRegisterId = async (req, res, next) => {
    try {
        const { courseRegisterId } = req.query;
        if (!courseRegisterId) {
            return res.status(200).json({
                errCode: 400,
                message: 'courseRegisterId is required'
            })
        }
        const clazz = await enrollmentService.getClazzByCourseRegisterId(courseRegisterId);
        return res.status(200).json(clazz)
    } catch (error) {
        next(error)
    }
}

const deleteClazz = async (req, res, next) => {
    try {
        const { clazzId } = req.body;
        if (!clazzId) {
            return res.status(200).json({
                errCode: 400,
                message: 'clazzId is required'
            })
        }
        const response = await enrollmentService.deleteClazz(clazzId);
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const getAllDay = async (req, res, next) => {
    try {
        const days = await enrollmentService.getAllDay();
        return res.status(200).json(days)
    } catch (error) {
        next(error)
    }
}

const getAllLession = async (req, res, next) => {
    try {
        const lessions = await enrollmentService.getAllLession();
        return res.status(200).json(lessions)
    } catch (error) {
        next(error)
    }
}

const createNewSchedule = async (req, res, next) => {
    try {
        const { clazzId, dayId, lessionId, startTime, endTime } = req.body;
        if (!clazzId || !dayId || !lessionId || !startTime || !endTime) {
            return res.status(200).json({
                errCode: 400,
                message: 'clazzId, dayId, lessionId, startTime, endTime are required'
            })
        }
        // check schedule exists
        const findScheduleRes = await enrollmentService.findScheduleByClazzIdDayIdLessionId(clazzId, dayId, lessionId);
        if (findScheduleRes.errCode === 0) {
            return res.status(200).json({
                errCode: 400,
                message: 'Schedule already exists',
                schedule: findScheduleRes.data
            })
        }

        const response = await enrollmentService.createNewSchedule(req.body);
        return res.status(201).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        })
    }
}

const getScheduleByClazzId = async (req, res, next) => {
    try {
        const { clazzId } = req.query;
        if (!clazzId) {
            return res.status(200).json({
                errCode: 400,
                message: 'clazzId is required'
            })
        }
        const schedules = await enrollmentService.getScheduleByClazzId(clazzId);
        return res.status(200).json(schedules)
    } catch (error) {
        next(error)
    }
}

const CreateNewEnrollmentCourse = async (req, res, next) => {
    try {
        const { clazzId, groupPractise } = req.body;
        const userInfo = req.userInfo;
        if (!clazzId || !groupPractise) {
            return res.status(200).json({
                errCode: 400,
                message: 'clazzId, groupPractise are required'
            })
        }
        // check enroll exists
        const findEnrollRes = await enrollmentService.findEnrollmentByClazzId(clazzId, userInfo.codeId);
        if (findEnrollRes.errCode === 0) {
            return res.status(200).json({
                errCode: 400,
                message: 'You already enrolled this course'
            })
        }
        const response = await enrollmentService.CreateNewEnrollmentCourse(clazzId, groupPractise, userInfo);
        return res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteEnrollmentCourse = async (req, res, next) => {
    try {
        const { enrollmentId } = req.body;
        if (!enrollmentId) {
            return res.status(200).json({
                errCode: 400,
                message: 'Enrollment is required'
            })
        }
        const response = await enrollmentService.deleteEnrollmentCourse(enrollmentId);
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }

}

const getEnrollmentByUserId = async (req, res, next) => {
    try {
        const semester = req.query.semester;
        if (!semester) {
            return res.status(200).json({
                errCode: 400,
                message: 'semester is required'
            })
        }
        const userInfo = req.userInfo;
        const enrollments = await enrollmentService.getEnrollmentByUserId(userInfo.codeId, semester);
        return res.status(200).json(enrollments)
    } catch (error) {
        next(error)
    }
}

const getCourseEnrollments = async (req, res, next) => {
    try {
        const userInfo = req.userInfo;
        const semester = req.query.semester;
        if (!semester) {
            return res.status(200).json({
                errCode: 400,
                message: 'semester is required'
            })
        }
        const enrollments = await enrollmentService.getCourseEnrollments(userInfo, semester);
        return res.status(200).json(enrollments)
    } catch (error) {
        next(error)
    }

}

const getScheduleByUserId = async (req, res, next) => {
    try {
        const userInfo = req.userInfo;
        const week = +req.params.week;
        if (!week) {
            return res.status(200).json({
                errCode: 400,
                message: 'week is required'
            })
        }
        const schedules = await enrollmentService.getScheduleByUserId(userInfo.codeId, week);
        return res.status(200).json(schedules)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewCourseRegister, getCourseRegisterBySemester, deleteCourseRegister, createNewClazz,
    getClazzByCourseRegisterId, deleteClazz, getAllDay, getAllLession, createNewSchedule,
    getScheduleByClazzId, CreateNewEnrollmentCourse, deleteEnrollmentCourse, getEnrollmentByUserId,
    getCourseEnrollments, getScheduleByUserId

}