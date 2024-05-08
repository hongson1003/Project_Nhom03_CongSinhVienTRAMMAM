import courseController from '../controllers/course.controller';
const checkUserAuthorize = require('../middleware/checkUserAuthorize');

const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the chat app' });
    })

    app.use(checkUserAuthorize);

    // semester routes

    app.post('/api/v1/course/semester', courseController.createNewSemester);
    app.post('/api/v1/course/semesters', courseController.createNewSemesters);
    app.delete('/api/v1/course/semester/:id', courseController.deleteSemester);
    app.get('/api/v1/course/specialize/semester', courseController.getSemesterBySpecializeId);

    // course routes

    app.post('/api/v1/course', courseController.createNewCourse);
    app.get('/api/v1/course', courseController.getCoursesLimit);
    app.delete('/api/v1/course/:id', courseController.deleteCourse);
    app.get('/api/v1/course/:id', courseController.getCourseById);
    app.post('/api/v1/course/info/ids', courseController.getCourseByIds)

    // semester_course
    app.post('/api/v1/course/semester/add-course', courseController.createNewSemesterCourse);


    // detail course

    app.post('/api/v1/course/detail', courseController.createNewDetailCourse);

}

module.exports = configRoutes;