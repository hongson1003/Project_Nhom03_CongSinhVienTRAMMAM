'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here


        }
    }
    Log.init({
        logId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deviceInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        errorDetail: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        severity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Log',
    });
    return Log;
};