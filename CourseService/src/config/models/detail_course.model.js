'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Detail_Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Detail_Course.belongsTo(models.Course, {
                foreignKey: 'courseId',
                as: 'course',
                onDelete: 'CASCADE',
            });

        }
    }
    Detail_Course.init({
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Course',
                key: 'courseId'
            },
            onDelete: 'CASCADE',
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        numberOfCredits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prerequisiteId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Courses',
                key: 'courseId'
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Detail_Course',
    });
    return Detail_Course;
};