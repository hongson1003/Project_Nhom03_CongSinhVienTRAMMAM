import courseService from '../services/course.service';
const axios = require('../config/axios').default;
require('dotenv').config();
const URL_INFO = process.env.URL_INFO;


// semester

const createNewSemester = async (req, res, next) => {
    try {
        const { name, specializeId } = req.body;
        if (!name || !specializeId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        };
        // check semester is exist
        const semester = await courseService.getSemesterByNameSpecialize(name, specializeId);
        if (semester.errCode === 0) {
            return res.status(200).json({
                errCode: 1,
                message: 'Semester is exist'
            });
        }
        // check specialize is exist
        const specializeRes = await axios.get(URL_INFO + `/api/v1/specialize/${specializeId}`);
        if (specializeRes.errCode !== 0) {
            return res.status(200).json({
                errCode: 1,
                message: 'Specialize is not exist'
            });
        }
        const response = await courseService.createNewSemester(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        });
    }
}

const deleteSemester = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.deleteSemester(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const createNewSemesters = async (req, res, next) => {
    try {
        const semesters = req.body;
        if (!semesters) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.createNewSemesters(semesters);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getSemesterBySpecializeId = async (req, res, next) => {
    try {
        const specializeId = req.query.specializeId;
        if (!specializeId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Please provide all required fields'
            });
        }
        //check specialize is exist
        const specializeRes = await axios.get(URL_INFO + `/api/v1/specialize/${specializeId}`);
        if (specializeRes.errCode !== 0) {
            return res.status(200).json({
                errCode: 1,
                message: 'Specialize is not exist'
            });
        }

        const response = await courseService.getSemesterBySpecializeId(specializeId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


const createNewCourse = async (req, res, next) => {
    try {
        const { courseName, description } = req.body;
        if (!courseName || !description) {
            return res.status(200).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.createNewCourse(req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getCoursesLimit = async (req, res, next) => {
    try {
        const limit = +req.query.limit;
        const response = await courseService.getCoursesLimit(limit);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.deleteCourse(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const createNewDetailCourse = async (req, res, next) => {
    try {
        const { courseId, numberOfCredits, price } = req.body;
        if (!courseId || !numberOfCredits || !price) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.createNewDetailCourse(req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}

const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.getCourseById(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getCourseByIds = async (req, res, next) => {
    try {
        const { ids } = req.body;
        if (!ids) {
            return res.status(200).json({
                errCode: 1,
                message: 'Please provide all required fields'
            });
        }
        const response = await courseService.getCourseByIds(ids);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const createNewSemesterCourse = async (req, res, next) => {
    try {
        const { semesterId, courseId } = req.body;
        if (!semesterId || !courseId) {
            return res.status(200).json({
                errCode: 1,
                message: 'Please provide all required fields'
            });
        }
        // check semester is exist
        const semester = await courseService.getSemesterById(semesterId);
        if (semester.errCode !== 0) {
            return res.status(200).json({
                errCode: 1,
                message: 'Semester is not exist'
            });
        }

        // check course is exist
        const course = await courseService.getCourseById(courseId);
        if (course.errCode !== 0) {
            return res.status(200).json({
                errCode: 1,
                message: 'Course is not exist'
            });
        }

        const response = await courseService.createNewSemesterCourse(req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}





module.exports = {
    createNewSemester, deleteSemester, createNewSemesters, getSemesterBySpecializeId,
    createNewCourse, getCoursesLimit, deleteCourse, createNewDetailCourse,
    getCourseById, getCourseByIds, createNewSemesterCourse
}