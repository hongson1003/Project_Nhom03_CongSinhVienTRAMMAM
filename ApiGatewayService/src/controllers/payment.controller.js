const axios = require('../config/axios').default;
const gateway = require('../config/gateway.config.json');

const createNewBank = async (req, res, next) => {
    try {
        const { accountNumber, branchName, cardNumber, password, name, userId } = req.body;
        if (!accountNumber || !branchName || !cardNumber || !password || !name || !userId) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const root = gateway.services['payment-service'].url;
        const path = gateway.routes['new-bank'].path;
        const response = await axios.post(root + path, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getBankByCodeId = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        if (!codeId) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const root = gateway.services['payment-service'].url;
        const path = gateway.routes['get-bank-by-codeId'].path + '/' + codeId;
        const response = await axios.get(root + path);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteBankByCodeId = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        if (!codeId) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const root = gateway.services['payment-service'].url;
        const path = gateway.routes['delete-bank-by-codeId'].path + '/' + codeId;
        const response = await axios.delete(root + path);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const createBill = async (req, res, next) => {
    try {
        const { joinClazzId, userId, price, semester } = req.body;
        if (!joinClazzId || !userId || !price || !semester) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const root = gateway.services['payment-service'].url;
        const path = gateway.routes['new-bill'].path;
        const response = await axios.post(root + path, req.body);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}


const getBills = async (req, res, next) => {
    try {
        const { codeId, semester } = req.query;
        if (!codeId || !semester) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const root = gateway.services['payment-service'].url;
        const path = gateway.routes['get-bills'].path + '?codeId=' + codeId + '&semester=' + semester;
        const response = await axios.get(root + path);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteBillByJoinClazzId = async (req, res, next) => {
    try {
        const { joinClazzId } = req.params;
        if (!joinClazzId) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }
        const root = gateway.services['payment-service'].url;
        const path = gateway.routes['delete-bill-by-clazzId'].path + '/' + joinClazzId;
        const response = await axios.delete(root + path);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createNewBank, getBankByCodeId, deleteBankByCodeId, createBill,
    getBills, deleteBillByJoinClazzId
}