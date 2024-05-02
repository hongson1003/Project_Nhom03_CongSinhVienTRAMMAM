'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Students', {
            codeId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                references: {
                    model: 'Users',
                    key: 'codeId'
                }
            },
            educationLevel: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numberOfCreditsIsCompleted: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            totalCredits: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cumulativeGPA: {
                type: Sequelize.FLOAT,
            },
            yearGraduated: {
                type: Sequelize.DATE,
            },
            yearGraduteDeadline: {
                type: Sequelize.DATE,
                allowNull: false,
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
        await queryInterface.dropTable('Students');
    }
};