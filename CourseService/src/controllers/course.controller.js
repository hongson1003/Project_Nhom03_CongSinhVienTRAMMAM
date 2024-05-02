import courseService from '../services/course.service';

// semester

const createNewSemester = async (req, res, next) => {
    try {
        const { name, specializeId } = req.body;
        if (!name || !specializeId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.createNewSemester(req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteSemester = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
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
        const { specializeId } = req.body;
        if (!specializeId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
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
            return res.status(400).json({ message: 'Please provide all required fields' });
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
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const response = await courseService.getCourseById(id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createNewSemester, deleteSemester, createNewSemesters, getSemesterBySpecializeId,
    createNewCourse, getCoursesLimit, deleteCourse, createNewDetailCourse,
    getCourseById
}