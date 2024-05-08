'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Join_Clazz extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Join_Clazz.belongsTo(models.Clazz, {
                foreignKey: 'clazzId',
                as: 'clazz'
            });
        }
    }
    Join_Clazz.init({
        joinClazzId: {
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
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupPractise: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Join_Clazz',
    });
    return Join_Clazz;
};