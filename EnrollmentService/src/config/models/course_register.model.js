'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course_Register extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Course_Register.hasMany(models.Clazz, {
                foreignKey: 'courseRegisterId',
                as: 'clazz'
            })
        }
    }
    Course_Register.init({
        registerId: {
            allowNull: false,
            type: DataTypes.STRING,
            primaryKey: true,
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
        modelName: 'Course_Register',
    });
    return Course_Register;
};