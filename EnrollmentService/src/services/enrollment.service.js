const { includes } = require('lodash');
const db = require('../config/models/index.model');
const { v4: uuidv4 } = require('uuid');
const { where } = require('sequelize');
const axios = require('../config/axios').default;
const URL_COURSE = process.env.URL_COURSE;
const urlInfo = process.env.URL_INFO;
const urlPayment = process.env.URL_PAYMENT;

const createNewCourseRegister = async (course, semester) => {
    try {
        if (!course || !semester) {
            return {
                errCode: 400,
                message: 'courseId and semester are required'
            }
        }
        const registerId = uuidv4();
        const courseRegister = await db.Course_Register.create({
            registerId,
            courseId: course.courseId,
            semester
        })
        const data = courseRegister.toJSON();
        data.course = course;
        if (!courseRegister) {
            return {
                errCode: 500,
                message: 'Internal Server Error'
            }
        }
        return {
            errCode: 201,
            message: 'Create new course register successfully',
            data
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const findCourseRegisterByCourseIdSemester = async (courseId, semester) => {
    try {
        const courseRegister = await db.Course_Register.findOne({
            where: {
                courseId,
                semester
            }
        })
        if (!courseRegister) {
            return {
                errCode: 404,
                message: 'courseId not exist'
            }
        }
        return {
            errCode: 0,
            data: courseRegister
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const getCourseRegisterBySemester = async (semester) => {
    try {
        const courseRegister = await db.Course_Register.findAll({
            where: {
                semester
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        if (!courseRegister) {
            return {
                errCode: 404,
                message: 'courseId not exist'
            }
        }
        // get ids
        const courseIds = courseRegister.map(course => course.courseId);
        const courseRes = await axios.post(URL_COURSE + '/api/v1/course/info/ids', { ids: courseIds });
        if (courseRes.errCode !== 0) {
            return {
                errCode: 404,
                message: 'courseId not exist'
            }
        }
        const customCourseRegister = courseRegister.map(register => {
            const course = courseRes.data.find(course => course.courseId === register.courseId);
            return {
                ...register,
                course
            }
        })
        return {
            errCode: 0,
            data: customCourseRegister
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const deleteCourseRegister = async (registerId) => {
    try {
        if (!registerId) {
            return {
                errCode: 400,
                message: 'registerId is required'
            }
        }
        const courseRegister = await db.Course_Register.findOne({
            where: {
                registerId
            },
            raw: false
        })
        if (!courseRegister) {
            return {
                errCode: 404,
                message: 'Course Register not exist'
            }
        }
        await courseRegister.destroy();
        return {
            errCode: 200,
            message: 'Delete course register successfully',
            data: courseRegister
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }

}

const createNewClazz = async (courseRegisterId, maxQuantity, name, teacherId) => {
    try {
        if (!courseRegisterId || !maxQuantity || !name || !teacherId) {
            return {
                errCode: 400,
                message: 'courseRegisterId, maxQuantity, quantity are required'
            }
        }
        const clazzId = uuidv4() + '-' + Date.now();
        const clazz = await db.Clazz.create({
            clazzId,
            courseRegisterId,
            maxQuantity,
            name,
            teacherId,
        })
        if (!clazz) {
            return {
                errCode: 500,
                message: 'Internal Server Error'
            }
        }
        return {
            errCode: 201,
            message: 'Create new clazz successfully',
            data: clazz
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const getClazzByCourseRegisterId = async (courseRegisterId) => {
    try {
        if (!courseRegisterId) {
            return {
                errCode: 400,
                message: 'courseRegisterId is required'
            }
        }
        const clazz = await db.Clazz.findAll({
            where: {
                courseRegisterId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: db.Course_Register,
                as: 'courseRegister',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                // raw: true
            }],
            raw: true,
            nest: true,

        })
        if (!clazz) {
            return {
                errCode: 404,
                message: 'courseRegisterId not exist'
            }
        }
        return {
            errCode: 0,
            data: clazz
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const deleteClazz = async (clazzId) => {
    try {
        if (!clazzId) {
            return {
                errCode: 400,
                message: 'clazzId is required'
            }
        }
        const clazz = await db.Clazz.findOne({
            where: {
                clazzId
            },
            raw: false
        })
        if (!clazz) {
            return {
                errCode: 404,
                message: 'clazzId not exist'
            }
        }
        await clazz.destroy();
        return {
            errCode: 200,
            message: 'Delete clazz successfully',
            data: clazz
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}


const getAllDay = async () => {
    try {
        const days = await db.Day.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        return {
            errCode: 0,
            data: days
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const getAllLession = async () => {
    try {
        const lessions = await db.Lession.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        return {
            errCode: 0,
            data: lessions
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const createNewSchedule = async (data) => {
    try {
        const schedule = await db.Clazz_Schedule.create(data);
        if (!schedule) {
            return {
                errCode: 500,
                message: 'Internal Server Error'
            }
        }
        // get schedule with day, lession, clazz
        const scheduleRes = await db.Clazz_Schedule.findOne({
            where: {
                clazzId: data.clazzId,
                dayId: data.dayId,
                lessionId: data.lessionId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: false,
            nest: true,
            include: [
                {
                    model: db.Clazz,
                    as: 'clazz',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: db.Course_Register,
                        as: 'courseRegister',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    }]
                },
                {
                    model: db.Day,
                    as: 'day',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }, {
                    model: db.Lession,
                    as: 'lession',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }],
        })

        return {
            errCode: 201,
            message: 'Create new schedule successfully',
            data: scheduleRes
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const findScheduleByClazzIdDayIdLessionId = async (clazzId, dayId, lessionId) => {
    try {
        const schedule = await db.Clazz_Schedule.findOne({
            where: {
                clazzId,
                dayId,
                lessionId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: false,
            nest: true,
            include: [{
                model: db.Clazz,
                as: 'clazz',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: db.Course_Register,
                    as: 'courseRegister',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }]
            }, {
                model: db.Day,
                as: 'day',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: db.Lession,
                as: 'lession',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
        })
        if (!schedule) {
            return {
                errCode: 404,
                message: 'schedule not exist'
            }
        }
        return {
            errCode: 0,
            data: schedule
        }
    } catch (error) {
        throw error;
    }

}


const getScheduleByClazzId = async (clazzId) => {
    try {
        const schedules = await db.Clazz_Schedule.findAll({
            where: {
                clazzId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: false,
            nest: true,
            include: [{
                model: db.Clazz,
                as: 'clazz',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: db.Course_Register,
                    as: 'courseRegister',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }]
            }, {
                model: db.Day,
                as: 'day',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }, {
                model: db.Lession,
                as: 'lession',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }],
        });
        if (!schedules) {
            return {
                errCode: 404,
                message: 'clazzId not exist'
            }
        }

        const clazz = await db.Clazz.findOne({
            where: {
                clazzId
            },
            raw: true
        });
        const teacherId = clazz.teacherId;
        const teacherRes = await axios.get(urlInfo + '/api/v1/teacher/' + teacherId);
        if (teacherRes.errCode !== 0) {
            return {
                errCode: 404,
                message: 'teacherId not exist'
            }
        }
        const teacher = teacherRes.data;
        const customSchedules = schedules.map(node => node.get({ plain: true })).map(schedule => {
            return {
                ...schedule,
                clazz: {
                    ...schedule.clazz,
                    teacher
                }
            }
        })


        return {
            errCode: 0,
            data: customSchedules
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }

}

const CreateNewEnrollmentCourse = async (clazzId, groupPractise, userInfo) => {
    const t = await db.sequelize.transaction();
    try {
        const { codeId } = userInfo;
        const clazz = await db.Clazz.findOne({
            where: {
                clazzId
            },
            raw: false,
            include: [{
                model: db.Course_Register,
                as: 'courseRegister',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }]
        })
        if (!clazz) {
            return {
                errCode: 404,
                message: 'clazzId not exist'
            }
        }

        const courseRes = await axios.get(URL_COURSE + '/api/v1/course/' + clazz.courseRegister.courseId);
        if (courseRes.errCode !== 0) {
            await t.rollback();
            return {
                errCode: 404,
                message: 'courseId not exist'
            }
        }

        // merge clazz
        const customClazz = clazz.get({ plain: true });
        customClazz.courseRegister.course = courseRes.data;

        const enrollment = await db.Join_Clazz.create({
            studentId: codeId,
            clazzId,
            groupPractise
        }, { transaction: t })


        // create bill
        const reqBill = {
            joinClazzId: enrollment.joinClazzId,
            userId: enrollment.studentId,
            price: customClazz.courseRegister.course.detail_course.price,
            semester: customClazz.courseRegister.semester,
        }
        const billRes = await axios.post(urlPayment + '/api/v1/payment/bill', reqBill);
        if (billRes.errCode !== 0) {
            await t.rollback();
            return {
                errCode: 500,
                message: 'Internal Server Error'
            }
        }

        if (!enrollment) {
            await t.rollback();
            return {
                errCode: 500,
                message: 'Internal Server Error'
            }
        }
        // enroll success
        // update quantity clazz
        const clazzCurrent = await db.Clazz.findOne({
            where: {
                clazzId
            },
            raw: false
        }, { transaction: t });


        if (clazzCurrent.quantity >= clazzCurrent.maxQuantity) {
            await t.rollback();
            return {
                errCode: 400,
                message: 'Clazz is full'
            }
        }
        clazzCurrent.quantity = clazzCurrent.quantity + 1;
        // savse
        await clazzCurrent.save({ transaction: t });

        await t.commit();
        return {
            errCode: 201,
            message: 'Create new enrollment successfully',
            data: enrollment
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }

}

const findEnrollmentByClazzId = async (clazzId, studentId) => {
    try {
        const enrollment = await db.Join_Clazz.findOne({
            where: {
                clazzId,
                studentId
            }
        })
        if (!enrollment) {
            return {
                errCode: 404,
                message: 'Enrollment not exist'
            }
        }
        return {
            errCode: 0,
            message: 'Enrollment exist',
            data: enrollment
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const deleteEnrollmentCourse = async (enrollmentId) => {
    const t = await db.sequelize.transaction();
    try {
        if (!enrollmentId) {
            return {
                errCode: 400,
                message: 'enrollmentId is required'
            }
        }
        const enrollment = await db.Join_Clazz.findOne({
            where: {
                joinClazzId: enrollmentId
            },
            raw: false
        })
        if (!enrollment) {
            return {
                errCode: 404,
                message: 'Enrollment not exist'
            }
        }
        // update quantity clazz
        const clazzCurrent = await db.Clazz.findOne({
            where: {
                clazzId: enrollment.clazzId
            },
            raw: false
        });
        clazzCurrent.quantity = clazzCurrent.quantity - 1;
        await clazzCurrent.save({ transaction: t });

        await enrollment.destroy({ transaction: t });

        // delete bill by joinClazzId
        const billRes = await axios.delete(urlPayment + '/api/v1/payment/bill/' + enrollmentId);
        if (billRes.errCode !== 0) {
            await t.rollback();
            return {
                errCode: 500,
                message: 'Internal Server Error'
            }
        }
        await t.commit();
        return {
            errCode: 200,
            message: 'Delete enrollment successfully',
            data: enrollment
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }

}

const getEnrollmentByUserId = async (userId, semester) => {
    try {
        const enrollments = await db.Join_Clazz.findAll({
            where: {
                studentId: userId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: db.Clazz,
                as: 'clazz',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: db.Course_Register,
                    as: 'courseRegister',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }]
            }],
            raw: true,
            nest: true
        })

        // get ids
        const courseIds = enrollments.map(enrollment => enrollment.clazz.courseRegister.courseId);
        const courseRes = await axios.post(URL_COURSE + '/api/v1/course/info/ids', { ids: courseIds });
        if (courseRes.errCode !== 0) {
            return {
                errCode: 404,
                message: 'courseId not exist'
            }
        }

        const customEnrollments = enrollments.map(enrollment => {
            const course = courseRes.data.find(course => course.courseId === enrollment.clazz.courseRegister.courseId);
            return {
                ...enrollment,
                clazz: {
                    ...enrollment.clazz,
                    courseRegister: {
                        ...enrollment.clazz.courseRegister,
                        course
                    }
                }
            }
        });

        const customEnrollmentsFilterSemester = customEnrollments.filter(enrollment => enrollment.clazz.courseRegister.semester === semester);

        return {
            errCode: 0,
            data: customEnrollmentsFilterSemester
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const getCourseEnrollments = async (userInfo, semester) => {
    try {
        const { codeId } = userInfo;
        const courseRegister = await db.Course_Register.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            raw: false,
            nest: true,
            include: [{
                model: db.Clazz,
                as: 'clazz',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: db.Join_Clazz,
                    as: 'joinClazzs',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                }]
            }],
            where: {
                semester: semester,
            }
        });

        const courseRegisterData = courseRegister.map(node => node.get({ plain: true }))
        const courseRegisterDataFilterNotEnrolled = courseRegisterData.filter(courseRegister => {
            const clazz = courseRegister.clazz;
            clazz.forEach(clazz => {
                const isEnrolled = includes(clazz.joinClazzs.map(enrollment => enrollment.studentId), codeId);
                clazz.isEnrolled = isEnrolled;
            })
            return clazz.every(clazz => !clazz.isEnrolled);
        });

        return {
            errCode: 0,
            data: courseRegisterDataFilterNotEnrolled
        }

    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const getScheduleByUserId = async (userId, week) => {
    try {
        const enrollments = await db.Join_Clazz.findAll({
            where: {
                studentId: userId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'studentId', 'clazzId', 'lessionId']
            },
            raw: false,
            nest: true,
            include: [{
                model: db.Clazz,
                as: 'clazz',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: db.Course_Register,
                        as: 'courseRegister',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: db.Clazz_Schedule,
                        as: 'schedules',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'clazzId', 'clazzScheduleId', 'dayId', 'lessionId']
                        },
                        include: [
                            {
                                model: db.Clazz,
                                as: 'clazz',
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt', 'courseRegisterId', 'maxQuantity',]
                                },
                                include: [{
                                    model: db.Course_Register,
                                    as: 'courseRegister',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                }],
                            },
                            {
                                model: db.Day,
                                as: 'day',
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt', 'dayId']
                                }
                            }, {
                                model: db.Lession,
                                as: 'lession',
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt', 'lessionId']
                                }
                            }],
                    }
                ]
            }],

        });

        const schedules = enrollments.map(enrollment => enrollment.clazz.schedules);
        const schedulesData = schedules.flat().map(node => node.get({ plain: true }));
        const now = new Date();
        const dateWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (week - 1) * 7);

        const schedulesDataFilter = schedulesData.filter(schedule => {
            const endTime = schedule.endTime;
            if (endTime >= dateWeek) {
                return true;
            }
            return false;
        });

        const courseIds = enrollments.map(enrollment => enrollment.clazz.courseRegister.courseId);
        const coursesRes = await axios.post(URL_COURSE + '/api/v1/course/info/ids', { ids: courseIds });
        if (coursesRes.errCode !== 0) {
            return {
                errCode: 404,
                message: 'courseId not exist'
            }
        }
        const customSchedulesData = schedulesDataFilter.map(schedule => {
            const course = coursesRes.data.find(course => course.courseId === schedule.clazz.courseRegister.courseId);
            return {
                ...schedule,
                clazz: {
                    ...schedule.clazz,
                    courseRegister: {
                        ...schedule.clazz.courseRegister,
                        course
                    }
                }
            }
        })

        return {
            errCode: 0,
            data: customSchedulesData
        }
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}


module.exports = {
    createNewCourseRegister, findCourseRegisterByCourseIdSemester, getCourseRegisterBySemester,
    deleteCourseRegister, createNewClazz, getClazzByCourseRegisterId, deleteClazz, getAllDay,
    getAllLession, createNewSchedule, findScheduleByClazzIdDayIdLessionId, getScheduleByClazzId,
    CreateNewEnrollmentCourse, findEnrollmentByClazzId, deleteEnrollmentCourse, getEnrollmentByUserId,
    getCourseEnrollments, getScheduleByUserId
}