const checkUserAuthorize = require('../middleware/checkUserAuthorize');
const gradeController = require('../controllers/grade.controller');
const checkRole = require('../middleware/checkRole');

const configRoutes = async (app) => {

    app.use(checkUserAuthorize);

    app.post('/api/v1/grade', checkRole.checkRoleTeacher, gradeController.createOrUpdateGrade);
    app.get('/api/v1/grade/semester', gradeController.getGradeBySemester);

}

module.exports = configRoutes;