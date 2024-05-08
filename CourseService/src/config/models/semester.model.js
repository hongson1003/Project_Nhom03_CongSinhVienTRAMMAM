'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Semester extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Semester.belongsToMany(models.Course, {
                through: 'Semester_Course',
                foreignKey: 'semesterId',
                as: 'courses',
            });
        }
    }
    Semester.init({
        semesterId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        specializeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Semester',
    });
    return Semester;
};