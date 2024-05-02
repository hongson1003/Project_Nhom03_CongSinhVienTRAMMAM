'use strict';
import {
    Model
} from 'sequelize';
module.exports = (sequelize, DataTypes) => {
    class Detail_Certification_User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here 
            Detail_Certification_User.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            Detail_Certification_User.belongsTo(models.Certification, {
                foreignKey: 'certificationId',
                as: 'certification'
            });
        }
    }
    Detail_Certification_User.init({
        certificationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            references: {
                model: 'Certification',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'User',
                key: 'codeId'
            }
        },
        achievedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Detail_Certification_User',
    });
    return Detail_Certification_User;
};