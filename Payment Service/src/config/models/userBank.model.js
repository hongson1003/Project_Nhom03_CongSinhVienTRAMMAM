'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserBank extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    UserBank.init({
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        bankId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        cardNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'UserBank',
    });
    return UserBank;
};