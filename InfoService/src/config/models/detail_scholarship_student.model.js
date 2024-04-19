'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Detail_ScholarShip_Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Detail_ScholarShip_Student.init({
        scholarShipId: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scholarShipAmount: {
            type: DataTypes.DOUBLE,
        },
        scholarShipProvider: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Detail_ScholarShip_Student',
    });
    return Detail_ScholarShip_Student;
};