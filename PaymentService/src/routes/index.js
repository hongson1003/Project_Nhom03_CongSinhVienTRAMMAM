
const paymentController = require('../controllers/payment.controller');
const checkAuthorize = require('../middleware/checkUserAuthorize');

const configRoutes = async (app) => {

    app.use(checkAuthorize);

    app.post('/api/v1/payment/bank', paymentController.createNewBank);
    app.get('/api/v1/payment/bank/:codeId', paymentController.getBankByCodeId);
    app.delete('/api/v1/payment/bank/:codeId', paymentController.deleteBankByCodeId)

    app.post('/api/v1/payment/bill', paymentController.createNewBill);
    app.get('/api/v1/payment/bill', paymentController.getBills);
    app.delete('/api/v1/payment/bill/:joinClazzId', paymentController.deleteBillById)

    app.post('/api/v1/payment/bill', paymentController.createNewBill);

}

module.exports = configRoutes;