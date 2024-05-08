const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const checkAuthorize = require('../middleware/check.authorize.middleware');
const checkRole = require('../middleware/checkRole.middleware');

const configEnrollmentRoute = (app) => {
    router.get('/', enrollmentController.getEnrollments);
    router.post('/', enrollmentController.createNewEnrollment);
    router.delete('/', enrollmentController.deleteEnrollment);
    router.get('/course-register', enrollmentController.getCourseRegistersBySemester);
    router.post('/new-course-register', checkRole.checkAdmin,
        enrollmentController.newCourseRegister);
    router.delete('/course-register', enrollmentController.deleteCourseRegister);
    router.post('/clazz', enrollmentController.createNewClazz);
    router.get('/clazz', enrollmentController.getClazzByRegisterId);
    router.delete('/clazz', enrollmentController.deleteClazz);
    router.get('/day', enrollmentController.getDaysOfWeek);
    router.get('/lession', enrollmentController.getLessions);
    router.post('/schedule', enrollmentController.createNewSchedule);
    router.get('/schedule', enrollmentController.getScheduleByClazzId);
    router.get('/course', enrollmentController.getCourseEnrollments);
    router.get('/schedule/myself/:week', enrollmentController.getScheduleMyself);



    app.use('/api/v1/enrollment', checkAuthorize, router);
}


module.exports = configEnrollmentRoute;