'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course.hasOne(models.Detail_Course, {
                foreignKey: 'courseId',
                as: 'detail_course',
            });
            Course.belongsToMany(models.Semester, {
                through: 'Semester_Course',
                foreignKey: 'courseId',
                as: 'semesters',
            });

        }
    }
    Course.init({
        courseId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};