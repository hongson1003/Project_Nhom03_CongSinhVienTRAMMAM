'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Schedule.init({
        scheduleId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        dayId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Day',
                key: 'dayId'
            }
        },
        lessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Lession',
                key: 'lessionId'
            }
        },
        groupPratise: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        basisId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};