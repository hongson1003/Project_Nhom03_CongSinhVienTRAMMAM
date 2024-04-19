'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Student.init({
        codeId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        educationLevel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfCreditsIsCompleted: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalCredits: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cumulativeGPA: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        studentStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};