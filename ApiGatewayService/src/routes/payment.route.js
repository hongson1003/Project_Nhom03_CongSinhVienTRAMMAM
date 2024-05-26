const express = require('express');
const router = express.Router();
const checkAuthorize = require('../middleware/check.authorize.middleware');
const paymentController = require('../controllers/payment.controller');
import rateLimiterMiddleware from '../middleware/blockServer.middleware';

const configPaymentRoute = (app) => {

    router.post('/bank', paymentController.createNewBank);
    router.get('/bank/:codeId', paymentController.getBankByCodeId);
    router.delete('/bank/:codeId', paymentController.deleteBankByCodeId);
    router.post('/bill', paymentController.createBill);
    router.get('/bill',rateLimiterMiddleware, paymentController.getBills);
    router.delete('/bill/:joinClazzId', paymentController.deleteBillByJoinClazzId);

    app.use('/api/v1/payment', checkAuthorize, router);
}


module.exports = configPaymentRoute;