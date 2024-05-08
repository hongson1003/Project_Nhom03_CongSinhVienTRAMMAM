'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Semester_Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Semester_Course.belongsTo(models.Semester, {
                foreignKey: 'semesterId',
                as: 'semester',
            });
            Semester_Course.belongsTo(models.Course, {
                foreignKey: 'courseId',
                as: 'course',
            });

        }
    }
    Semester_Course.init({
        semesterId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            references: {
                model: 'Semester',
                key: 'semesterId'
            },
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Course',
                key: 'courseId'
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Semester_Course',
    });
    return Semester_Course;
};