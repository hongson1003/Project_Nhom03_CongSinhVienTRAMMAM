const enrollmentController = require('../controllers/enrollment.controller');
const checkUserAuthorize = require('../middleware/checkUserAuthorize');

const configRoutes = async (app) => {

    app.use('/', checkUserAuthorize);

    app.post('/api/v1/enrollment/course-register', enrollmentController.createNewCourseRegister)
    app.get('/api/v1/enrollment/course-register', enrollmentController.getCourseRegisterBySemester)
    app.delete('/api/v1/enrollment/course-register', enrollmentController.deleteCourseRegister)
    app.post('/api/v1/enrollment/clazz', enrollmentController.createNewClazz);
    app.get('/api/v1/enrollment/clazz', enrollmentController.getClazzByCourseRegisterId);
    app.delete('/api/v1/enrollment/clazz', enrollmentController.deleteClazz);
    app.get('/api/v1/enrollment/day', enrollmentController.getAllDay);
    app.get('/api/v1/enrollment/lession', enrollmentController.getAllLession);
    app.post('/api/v1/enrollment/schedule', enrollmentController.createNewSchedule);
    app.get('/api/v1/enrollment/schedule', enrollmentController.getScheduleByClazzId);
    app.post('/api/v1/enrollment', enrollmentController.CreateNewEnrollmentCourse);
    app.delete('/api/v1/enrollment', enrollmentController.deleteEnrollmentCourse)
    app.get('/api/v1/enrollment', enrollmentController.getEnrollmentByUserId);
    app.get('/api/v1/enrollment/course', enrollmentController.getCourseEnrollments);
    app.get('/api/v1/enrollment/schedule/myself/week/:week', enrollmentController.getScheduleByUserId);





}

module.exports = configRoutes;