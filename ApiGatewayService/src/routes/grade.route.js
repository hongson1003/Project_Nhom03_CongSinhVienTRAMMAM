const express = require('express');
const router = express.Router();
const checkAuthorize = require('../middleware/check.authorize.middleware');
const gradeController = require('../controllers/grade.controller');

const configGradeRoute = (app) => {

    router.post('/', gradeController.createOrUpdateGrade);
    router.get('/semester', gradeController.getGradeBySemester);

    app.use('/api/v1/grade', checkAuthorize, router);
}


module.exports = configGradeRoute;