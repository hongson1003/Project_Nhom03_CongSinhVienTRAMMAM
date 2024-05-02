'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Basis, {
                foreignKey: 'basisId',
                as: 'basis'
            });
            User.belongsTo(models.Specialize, {
                foreignKey: 'specializeId',
                as: 'specialize'
            });
            User.hasOne(models.Student, {
                foreignKey: 'codeId',
                as: 'student'
            });
            User.hasOne(models.Teacher, {
                foreignKey: 'codeId',
                as: 'teacher'
            });

        }
    }
    User.init({
        codeId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        placeOfBirth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schoolEntryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        profileCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        basisId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specializeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};