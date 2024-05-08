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

    app.get('/api/v1/user', userMiddleware.extractAccessToken, authController.findUserByCodeId);

    app.post('/api/v1/auth/signin', authController.signIn);

    app.post('/api/v1/auth/signout', userMiddleware.extractAccessToken, authController.signOut);

    app.post('/api/v1/auth/reload-page', authController.reloadPage);

    app.post('/api/v1/auth/log', authController.createLog);

    app.get('/api/v1/auth/users', userMiddleware.extractAccessToken, authController.getUsers);

}

module.exports = configRoutes;