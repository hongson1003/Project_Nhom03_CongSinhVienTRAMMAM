import courseController from '../controllers/course.controller';

const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the chat app' });
    })

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

    // detail course

    app.post('/api/v1/course/detail', courseController.createNewDetailCourse);

}

module.exports = configRoutes;