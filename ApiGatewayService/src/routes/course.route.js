const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const checkAuthorize = require('../middleware/check.authorize.middleware');

const configCourseRoute = (app) => {

    router.post('/new-course', courseController.createNewCourse);
    router.get('/', courseController.getCourses);
    router.get('/:courseId', courseController.getCourseById);
    router.delete('/:courseId', courseController.deleteCourseById);
    router.post('/detail', courseController.createCourseDetail);
    router.get('/specialize/semester', courseController.getSpecializeSemester);
    router.post('/info/ids', courseController.getCourseIds);
    router.post('/new-semester', courseController.createNewSemester);
    router.post('/semester/add-course', courseController.addCourseToSemester);



    app.use('/api/v1/course', checkAuthorize, router);
}


module.exports = configCourseRoute;