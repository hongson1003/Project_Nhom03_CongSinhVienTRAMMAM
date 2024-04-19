'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Sessions', {
            sessionId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'codeId'
                }
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: false
            },
            deviceInfo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            loginTime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            logoutTime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
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
        await queryInterface.dropTable('Sessions');
    }
};