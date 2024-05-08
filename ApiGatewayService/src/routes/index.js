const gateway = require('../config/gateway.config.json');
const authController = require('../controllers/auth.controller');
const checkAuthorize = require('../middleware/check.authorize.middleware');
const configInfoRoute = require('./info.route');
const configCourseRoute = require('./course.route');
const configEnrollmentRoute = require('./enrollment.route');
const configGradeRoute = require('./grade.route');
const configPaymentRoute = require('./payment.route');

const configRoutes = async (app) => {
    app.get('/health', (req, res) => {
        return res.status(200).json({
            message: 'My API is healthy'
        });
    })

    app.post(gateway.routes['login-route'].path, authController.signIn);
    app.post(gateway.routes['logout-route'].path, authController.signOut);
    app.post(gateway.routes['signup-route'].path, authController.signUp);
    app.post(gateway.routes.reload.path, authController.reload);
    app.get(gateway.routes['find-user'].path, checkAuthorize, authController.findUserByID);
    app.get(gateway.routes['roles-limit'].path, checkAuthorize, authController.getRolesLimit);
    app.get(gateway.routes['get-users'].path, checkAuthorize, authController.getUsers);

    configPaymentRoute(app);
    configInfoRoute(app);
    configCourseRoute(app);
    configEnrollmentRoute(app);
    configGradeRoute(app);
}

module.exports = configRoutes;