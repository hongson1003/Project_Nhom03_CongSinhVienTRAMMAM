import db from '../config/models/index.model';

// semester

const createNewSemester = async (data) => {
    try {
        const semester = await db.Semester.create(data);
        if (!semester) {
            return {
                errCode: 1,
                message: 'Semester not created',
            };
        }
        return {
            errCode: 0,
            message: 'Semester created',
            data: semester
        }
    } catch (error) {
        throw error;
    }
}

const deleteSemester = async (id) => {
    try {
        const semester = await db.Semester.destroy({
            where: {
                semesterId: id
            }
        });
        if (!semester) {
            return {
                errCode: 1,
                message: 'Semester not deleted',
            };
        }
        return {
            errCode: 0,
            message: 'Semester deleted',
        }
    } catch (error) {
        throw error;
    }

}

const createNewSemesters = async (data) => {
    try {
        const semesters = await db.Semester.bulkCreate(data);
        if (!semesters) {
            return {
                errCode: 1,
                message: 'Semesters not created',
            };
        }
        return {
            errCode: 0,
            message: 'Semesters created',
            data: semesters
        }
    } catch (error) {
        throw error;
    }

}

const getSemesterBySpecializeId = async (specializeId) => {
    try {
        const semesters = await db.Semester.findAll({
            where: {
                specializeId
            }
        });
        if (!semesters) {
            return {
                errCode: 1,
                message: 'Semesters not found',
            };
        }
        return {
            errCode: 0,
            message: 'Semesters found',
            data: semesters
        }
    } catch (error) {
        throw error;
    }
}

// course

const createNewCourse = async (data) => {
    try {
        const course = await db.Course.create(data);
        if (!course) {
            return {
                errCode: 1,
                message: 'Course not created',
            };
        }
        return {
            errCode: 0,
            message: 'Course created',
            data: course
        }
    } catch (error) {
        throw error;
    }
}

const getCoursesLimit = async (limit) => {
    try {
        const courses = await db.Course.findAll({
            limit: limit,
            raw: false,
            nest: true,
            include: {
                model: db.Detail_Course,
                as: 'detail_course',
            }
        });
        if (!courses) {
            return {
                errCode: 1,
                message: 'Courses not found',
            };
        }
        // handle price
        courses.forEach(course => {
            const price = course.detail_course.price;
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
            course.detail_course.price = formattedPrice;
        });
        return {
            errCode: 0,
            message: 'Courses found',
            data: courses
        }
    } catch (error) {
        throw error;
    }
}

const deleteCourse = async (id) => {
    try {
        const course = await db.Course.destroy({
            where: {
                courseId: id
            }
        });
        if (!course) {
            return {
                errCode: 1,
                message: 'Course not deleted',
            };
        }
        return {
            errCode: 0,
            message: 'Course deleted',
        }
    } catch (error) {
        throw error;
    }

}

const createNewDetailCourse = async (data) => {
    try {
        const detail_course = await db.Detail_Course.create(data);
        if (!detail_course) {
            return {
                errCode: 1,
                message: 'Detail course not created',
            };
        }
        return {
            errCode: 0,
            message: 'Detail course created',
            data: detail_course
        }
    } catch (error) {
        throw error;
    }
}

const getCourseById = async (id) => {
    try {
        const course = await db.Course.findOne({
            where: {
                courseId: id
            },
            raw: false,
            nest: true,
            include: {
                model: db.Detail_Course,
                as: 'detail_course',
            }
        });
        if (!course) {
            return {
                errCode: 1,
                message: 'Course not found',
            };
        }

        const courseData = course.toJSON();
        const price = courseData.detail_course.price;
        const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        courseData.detail_course.price = formattedPrice;
        return {
            errCode: 0,
            message: 'Course found',
            data: courseData
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createNewSemester, deleteSemester, createNewSemesters,
    getSemesterBySpecializeId, createNewCourse, getCoursesLimit,
    deleteCourse, createNewDetailCourse, getCourseById
}