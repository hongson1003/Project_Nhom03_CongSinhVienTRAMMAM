'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher.belongsTo(models.User, {
                foreignKey: 'codeId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    }
    Teacher.init({
        codeId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        educationLevel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearContactExpired: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Teacher',
    });
    return Teacher;
};