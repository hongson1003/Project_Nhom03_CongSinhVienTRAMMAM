'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Departments', {
            departmentId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
            },
            // alter manageID to managerId
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Rooms',
                    key: 'roomId'
                }
            },
            phoneNumber: {
                type: Sequelize.STRING,
                unique: true,
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
        await queryInterface.dropTable('Departments');
    }
};