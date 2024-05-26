'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Token.init({
        tokenId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accesss_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expiredTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Token',
    });
    return Token;
};