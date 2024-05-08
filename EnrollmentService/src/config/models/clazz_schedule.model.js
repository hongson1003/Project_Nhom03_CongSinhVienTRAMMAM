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
            Clazz_Schedule.belongsTo(models.Clazz, { foreignKey: 'clazzId', as: 'clazz' });
            Clazz_Schedule.belongsTo(models.Day, { foreignKey: 'dayId', as: 'day' });
            Clazz_Schedule.belongsTo(models.Lession, { foreignKey: 'lessionId', as: 'lession' });
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
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        dayId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Day',
                key: 'dayId'
            },
        },
        lessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Lession',
                key: 'lessionId'
            },
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        groupPractise: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Clazz_Schedule',
    });
    return Clazz_Schedule;
};