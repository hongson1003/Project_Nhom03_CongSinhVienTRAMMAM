'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clazz_Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Clazz_Schedule.init({
        clazzScheduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        clazzId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Clazz',
                key: 'clazzId'
            }
        },
        scheduleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Schedule',
                key: 'scheduleId'
            }
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Clazz_Schedule',
    });
    return Clazz_Schedule;
};