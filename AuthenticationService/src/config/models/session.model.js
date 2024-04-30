'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Session.init({
        sessionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deviceInfo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        logoutTime: {
            type: DataTypes.DATE,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        tokenId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Token',
                key: 'tokenId'
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Session',
    });
    return Session;
};