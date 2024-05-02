'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialize extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Specialize.belongsTo(models.Department, {
                foreignKey: 'departmentId',
                as: 'department'
            })

        }
    }
    Specialize.init({
        specializeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
        },
        totalCredits: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Department',
                key: 'departmentId'
            }
        },
        numberOfYearsTraining: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Specialize',
    });
    return Specialize;
};