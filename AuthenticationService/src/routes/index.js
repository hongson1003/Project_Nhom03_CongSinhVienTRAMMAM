import authController from '../controllers/auth.controller';
import userMiddleware from '../middleware/user.middleware';


const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the TRAMMAM university' });
    });

    app.get('/health', (req, res) => {
        return res.status(200).json({ message: 'Server authentication is good' });
    });

    app.get('/api/v1/auth/role', authController.getRolesLimit);

    app.post('/api/v1/auth/signup', authController.signUp);

    app.get('/api/v1/user', userMiddleware.checkJWT, authController.findUserByCodeId);

    app.post('/api/v1/auth/signin', authController.signIn);

    app.post('/api/v1/auth/signout', userMiddleware.checkJWT, authController.signOut);

    app.post('/api/v1/auth/reload-page', userMiddleware.checkJWT, authController.reloadPage);

    app.post('/api/v1/auth/log', authController.createLog);


}

module.exports = configRoutes;