'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Course_Registers', {
            registerId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            courseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            semester: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
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
        await queryInterface.dropTable('Course_Registers');
    }
};