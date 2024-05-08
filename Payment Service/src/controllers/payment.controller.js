

const paymentService = require('../services/payment.service');

const createNewBank = async (req, res, next) => {
    try {
        const { accountNumber, branchName, cardNumber, name, password, userId } = req.body;
        if (!accountNumber || !branchName || !cardNumber || !name || !password || !userId) {
            return res.status(200).json({
                message: 'All fields are required'
            });
        }
        // check exist bank account
        const checkBank = await paymentService.checkExistBank(accountNumber, cardNumber);
        if (checkBank.errCode !== 0) {
            return res.status(200).json(checkBank);
        }
        const response = await paymentService.createNewBank(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const getBankByCodeId = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        if (!codeId) {
            return res.status(200).json({
                message: 'All fields are required'
            });
        }
        const response = await paymentService.getBankByCodeId(codeId);
        return res.status(200).json(response);
    } catch (error) {
        return {
            errCode: 500,
            message: error.message
        }
    }
}

const deleteBankByCodeId = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        if (!codeId) {
            return res.status(200).json({
                message: 'All fields are required'
            });
        }
        const response = await paymentService.deleteBankByCodeId(codeId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        })
    }
}

const createNewBill = async (req, res, next) => {
    try {
        const { joinClazzId, userId, price, semester } = req.body;
        if (!joinClazzId || !userId || !price || !semester) {
            return res.status(200).json({
                message: 'All fields are required'
            });
        }
        const response = await paymentService.createNewBill(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        })
    }
}

const getBills = async (req, res, next) => {
    try {
        const { codeId, semester } = req.query;
        if (!codeId || !semester) {
            return res.status(200).json({
                message: 'All fields are required'
            });
        }
        const response = await paymentService.getBills(codeId, semester);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        })
    }
}

const deleteBillById = async (req, res, next) => {
    try {
        const { joinClazzId } = req.params;
        if (!joinClazzId) {
            return res.status(200).json({
                message: 'All fields are required'
            });
        }
        const response = await paymentService.deleteBillById(joinClazzId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errCode: 500,
            message: error.message
        })
    }
}




module.exports = {
    createNewBank, getBankByCodeId, deleteBankByCodeId, createNewBill,
    getBills, deleteBillById
}