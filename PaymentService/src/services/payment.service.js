const db = require('../config/models/index.model');
require('dotenv').config();
const URL_ENROLLMENT = process.env.URL_ENROLLMENT

const createNewBank = async (data) => {
    try {
        const newBank = await db.Bank.create(data);
        if (!newBank) {
            return {
                errCode: 500,
                message: 'Could not create new bank account'
            }
        }
        return {
            errCode: 0,
            message: 'Create new bank account successfully',
            data: newBank
        }
    } catch (error) {
        throw error;
    }
}

const checkExistBank = async (accountNumber, cardNumber) => {
    try {
        const bank = await db.Bank.findOne({
            where: {
                accountNumber,
                cardNumber
            }
        });
        if (bank) {
            return {
                errCode: 500,
                message: 'Bank account is already exist'
            }
        }
        return {
            errCode: 0,
            message: 'Bank account is not exist'
        }
    } catch (error) {
        throw error;
    }
}

const getBankByCodeId = async (codeId) => {
    try {
        const bank = await db.Bank.findOne({
            where: {
                userId: codeId
            }
        });
        if (!bank) {
            return {
                errCode: 500,
                message: 'Bank account is not exist'
            }
        }
        return {
            errCode: 0,
            message: 'Get bank account successfully',
            data: bank
        }
    } catch (error) {
        throw error;
    }
}

const deleteBankByCodeId = async (codeId) => {
    try {
        const bank = await db.Bank.findOne({
            where: {
                userId: codeId
            },
            raw: false
        });
        if (!bank) {
            return {
                errCode: 500,
                message: 'Bank account is not exist'
            }
        }
        await bank.destroy();
        return {
            errCode: 0,
            message: 'Delete bank account successfully',
            data: bank
        }
    } catch (error) {
        throw error;
    }

}

const createNewBill = async (data) => {
    try {
        const newBill = await db.Bill.create(data);
        if (!newBill) {
            return {
                errCode: 500,
                message: 'Could not create new bill'
            }
        }
        return {
            errCode: 0,
            message: 'Create new bill successfully',
            data: newBill
        }
    } catch (error) {
        throw error;
    }
}

const getBills = async (codeId, semester) => {
    try {
        const bills = await db.Bill.findAll({
            where: {
                userId: codeId,
                semester
            }
        });


        if (!bills) {
            return {
                errCode: 500,
                message: 'Bills are not exist'
            }
        }
        return {
            errCode: 0,
            message: 'Get bills successfully',
            data: bills
        }
    } catch (error) {
        throw error;
    }
}

const deleteBillById = async (joinClazzId) => {
    try {
        const bill = await db.Bill.findOne({
            where: {
                joinClazzId
            },
            raw: false
        });
        if (!bill) {
            return {
                errCode: 500,
                message: 'Bill is not exist'
            }
        }
        await bill.destroy();
        return {
            errCode: 0,
            message: 'Delete bill successfully',
            data: bill
        }
    } catch (error) {
        throw error;
    }
}



module.exports = {
    createNewBank, checkExistBank, getBankByCodeId, deleteBankByCodeId,
    createNewBill, getBills, deleteBillById
}