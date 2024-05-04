'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CourseRegister extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    CourseRegister.init({
        registerId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'CourseRegister',
    });
    return CourseRegister;
};