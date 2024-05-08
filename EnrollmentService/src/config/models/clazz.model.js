'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clazz extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Clazz.belongsTo(models.Course_Register, {
                foreignKey: 'courseRegisterId',
                as: 'courseRegister'
            })
            Clazz.hasMany(models.Join_Clazz, {
                foreignKey: 'clazzId',
                as: 'joinClazzs'
            })
            Clazz.hasMany(models.Clazz_Schedule, {
                foreignKey: 'clazzId',
                as: 'schedules'
            })
        }
    }
    Clazz.init({
        clazzId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teacherId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        maxQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('CHUA_MO', 'DANG_MO', 'DA_DONG'),
            allowNull: false,
            defaultValue: 'CHUA_MO',
        },
        courseRegisterId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Course_Register',
                key: 'registerId'
            }
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Clazz',
    });
    return Clazz;
};