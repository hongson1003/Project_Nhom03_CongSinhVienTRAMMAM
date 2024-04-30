'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Logs', {
            logId: {
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
            action: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: false
            },
            deviceInfo: {
                type: Sequelize.STRING,
                allowNull: false
            },
            errorDetail: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null
            },
            severity: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        await queryInterface.dropTable('Logs');
    }
};