'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Schedules', {
            scheduleId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            dayId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Days',
                    key: 'dayId'
                }
            },
            lessionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Lessions',
                    key: 'lessionId'
                }
            },
            groupPratise: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            basisId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            start: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end: {
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
        await queryInterface.dropTable('Schedules');
    }
};