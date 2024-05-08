const express = require('express');
const router = express.Router();
const gateway = require('../config/gateway.config.json');
const infoController = require('../controllers/info.controller');
const checkAuthorize = require('../middleware/check.authorize.middleware');

const configInfoRoute = (app) => {
    router.post('/new-basic', infoController.createNewBasis);
    router.get('/basis', infoController.getBasis);
    router.get('/basis/:basisId', infoController.getBasisById);
    router.put('/basis', infoController.updateBasis);
    router.delete('/basis/:basisId', infoController.deleteBasis);
    router.post('/new-room', infoController.createNewRoom);
    router.get('/room', infoController.getRooms);
    router.delete('/room/:roomId', infoController.deleteRoom);
    router.get('/room/:roomId', infoController.getRoomById);
    router.post('/new-department', infoController.createNewDepartment);
    router.get('/department', infoController.getDepartments);
    router.get('/department/:departmentId', infoController.getDepartmentById);
    router.delete('/department/:departmentId', infoController.deleteDepartment);
    router.post('/new-specialize', infoController.createNewSpecialize);
    router.get('/specialize', infoController.getSpecializes);
    router.get('/specialize/:specializeId', infoController.getSpecializeById);
    router.delete('/specialize/:specializeId', infoController.deleteSpecialize);
    router.post('/new-user', infoController.createNewUser);
    router.delete('/user/:codeId', infoController.deleteUser);
    router.put('/user', infoController.updateUser);
    router.get('/user', infoController.getUsers);
    router.get('/user/:codeId', infoController.getUserById);
    router.post('/new-student', infoController.createNewStudent);
    router.delete('/student/:codeId', infoController.deleteStudent);
    router.get('/student/:codeId', infoController.getStudentId);
    router.put('/student', infoController.updateStudent);
    router.post('/new-teacher', infoController.createNewTeacher);
    router.put('/teacher', infoController.updateTeacher);
    router.get('/teacher/:codeId', infoController.getTeacherById);
    router.delete('/teacher/:codeId', infoController.deleteTeacher);




    app.use('/api/v1/info', checkAuthorize, router);
}

module.exports = configInfoRoute;