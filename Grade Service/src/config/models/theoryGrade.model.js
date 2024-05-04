'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TheoryGrade extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    TheoryGrade.init({
        joinClazzId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        score1: DataTypes.FLOAT,
        score2: DataTypes.FLOAT,
        score3: DataTypes.FLOAT,
        middleScore: DataTypes.FLOAT,
        finalScore: DataTypes.FLOAT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'TheoryGrade',
    });
    return TheoryGrade;
};