import infoController from '../controllers/infoController';

const configRoutes = async (app) => {
    app.get('/health', (req, res) => {
        res.status(200).send({ status: 'OK' })
    })

    // room routes
    app.post('/api/v1/new-room', infoController.createNewRoom);
    app.get('/api/v1/room', infoController.getRoom);
    app.get('/api/v1/room/:roomId', infoController.getRoomById);
    app.delete('/api/v1/room/:roomId', infoController.deleteRoom);

    // basis routes
    app.post('/api/v1/new-basis', infoController.createNewBasis);
    app.get('/api/v1/basis', infoController.getBasis);
    app.get('/api/v1/basis/:basisId', infoController.getBasisById);
    app.put('/api/v1/basis', infoController.updateBasis);
    app.delete('/api/v1/basis/:basisId', infoController.deleteBasis);


    // department routes
    app.post('/api/v1/new-department', infoController.createNewDepartment);
    app.get('/api/v1/department', infoController.getDepartments);
    app.get('/api/v1/department/:departmentId', infoController.getDepartmentById);
    app.delete('/api/v1/department/:departmentId', infoController.deleteDepartment);

    // specialize routes
    app.post('/api/v1/new-specialize', infoController.createNewSpecialize);
    app.get('/api/v1/specialize', infoController.getSpecializes);
    app.get('/api/v1/specialize/:specializeId', infoController.getSpecializeById);
    app.delete('/api/v1/specialize/:specializeId', infoController.deleteSpecialize);

    // user routes
    app.post('/api/v1/new-user', infoController.createNewUser);
    app.delete('/api/v1/user/:codeId', infoController.deleteUser);
    app.put('/api/v1/user', infoController.updateUser);
    app.get('/api/v1/user', infoController.getUsers);
    app.get('/api/v1/user/:codeId', infoController.getUserById);

    // student routes
    app.post('/api/v1/new-student', infoController.createNewStudent);
    app.delete('/api/v1/student/:codeId', infoController.deleteStudent);
    app.get('/api/v1/student/:codeId', infoController.getStudentByCodeId);
    app.put('/api/v1/student', infoController.updateStudent);

    // teacher routes
    app.post('/api/v1/new-teacher', infoController.createNewTeacher);
    app.get('/api/v1/teacher/:codeId', infoController.getTeacherById);
    app.delete('/api/v1/teacher/:codeId', infoController.deleteTeacher);
    app.put('/api/v1/teacher', infoController.updateTeacher);

    // certificate routes

    app.post('/api/v1/new-certificate', infoController.createNewCertificate);
    app.get('/api/v1/certificate', infoController.getCertificates);
    app.get('/api/v1/certificate/:certificateId', infoController.getCertificateById);
    app.delete('/api/v1/certificate/:certificateId', infoController.deleteCertificate);

    // detail certificate user routes

    app.post('/api/v1/new-detail-certificate-user', infoController.createNewDetailCertificateUser);
    app.get('/api/v1/detail-certificate-user', infoController.getDetailCertificateUsers);
    app.delete('/api/v1/detail-certificate-user/:certificationId/:userId', infoController.deleteDetailCertificateUser);

}

module.exports = configRoutes;