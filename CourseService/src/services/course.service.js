import { at } from 'lodash';
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
        return {
            errCode: 500,
            message: error.message,
        };
    }
}

const getSemesterByNameSpecialize = async (name, specializeId) => {
    try {
        const semester = await db.Semester.findOne({
            where: {
                name,
                specializeId
            }
        });
        if (!semester) {
            return {
                errCode: 1,
                message: 'Semester not found',
            };
        }
        return {
            errCode: 0,
            message: 'Semester found',
            data: semester
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message,
        };
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
        return {
            errCode: 500,
            message: error.message,
        };
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
        return {
            errCode: 500,
            message: error.message,
        };
    }

}

const getSemesterBySpecializeId = async (specializeId) => {
    try {
        const semesters = await db.Semester.findAll({
            where: {
                specializeId
            },
            raw: false,
            nest: true,
            include: [
                {
                    model: db.Course,
                    as: 'courses',
                    attributes: ['courseId', 'courseName'],
                }
            ]
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
        return {
            errCode: 500,
            message: error.message,
        }
    }
}

const getSemesterById = async (semesterId) => {
    try {
        const semester = await db.Semester.findOne({
            where: {
                semesterId
            },
        })
        if (!semester) {
            return {
                errCode: 1,
                message: 'Semester not found',
            };
        }
        return {
            errCode: 0,
            message: 'Semester found',
            data: semester
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
        return {
            errCode: 500,
            message: error.message,
        };
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
        return {
            errCode: 0,
            message: 'Courses found',
            data: courses
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message,
        };
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
        return {
            errCode: 500,
            message: error.message,
        };
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
        return {
            errCode: 500,
            message: error.message,
        }
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
        return {
            errCode: 0,
            message: 'Course found',
            data: course
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message,
        };
    }
}

const getCourseByIds = async (ids) => {
    try {
        // ids =[1,2,3 ]
        // where: {'tags.id': {in: [1,2,3,4]}}
        const courses = await db.Course.findAll({
            where: {
                courseId: {
                    [db.Sequelize.Op.in]: ids
                }
            },
            attributes: ['courseId', 'courseName'],
            raw: false,
            nest: true,
            include: {
                model: db.Detail_Course,
                as: 'detail_course',
                attributes: ['numberOfCredits', 'price'],
            }
        });
        if (!courses) {
            return {
                errCode: 1,
                message: 'Courses not found',
            };
        }
        return {
            errCode: 0,
            message: 'Courses found',
            data: courses
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message,
        };
    }
}

const createNewSemesterCourse = async (data) => {
    try {
        const semesterCourse = await db.Semester_Course.create(data);
        if (!semesterCourse) {
            return {
                errCode: 1,
                message: 'Semester course not created',
            };
        }

        const getSemesterCourse = await db.Semester_Course.findOne({
            where: {
                semesterId: semesterCourse.semesterId,
                courseId: semesterCourse.courseId
            },
            raw: false,
            nest: true,
            attributes: {
                exclude: ['semesterId', 'courseId', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: db.Semester,
                    as: 'semester',
                    attributes: ['semesterId', 'name'],
                },
                {
                    model: db.Course,
                    as: 'course',
                    attributes: ['courseId', 'courseName'],
                }
            ]
        });

        return {
            errCode: 0,
            message: 'Semester course created',
            data: getSemesterCourse
        }

    } catch (error) {
        return {
            errCode: 500,
            message: error.message,
        };
    }

}


module.exports = {
    createNewSemester, deleteSemester, createNewSemesters,
    getSemesterBySpecializeId, createNewCourse, getCoursesLimit,
    deleteCourse, createNewDetailCourse, getCourseById, getCourseByIds,
    getSemesterByNameSpecialize, createNewSemesterCourse, getSemesterById
}