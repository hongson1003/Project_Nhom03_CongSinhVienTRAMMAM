'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, {
                as: 'role',
                foreignKey: 'roleId',
            })

        }
    }
    User.init({
        codeId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Role',
                key: 'roleId'
            }
        },
        accountStatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};