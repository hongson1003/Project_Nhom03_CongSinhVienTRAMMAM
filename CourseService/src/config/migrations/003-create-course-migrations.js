'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Courses', {
            courseId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            courseName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.INTEGER,
            },
            managerId: {
                type: Sequelize.STRING,
            },
            departmentId: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Courses');
    }
};