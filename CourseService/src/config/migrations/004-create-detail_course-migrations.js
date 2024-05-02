'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Detail_Courses', {
            courseId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
                references: {
                    model: 'Courses',
                    key: 'courseId'
                },
                onDelete: 'CASCADE',
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            numberOfCredits: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            prerequisiteId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Courses',
                    key: 'courseId'
                },
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Detail_Courses');
    }
};