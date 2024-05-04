'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Clazz_Schedules', {
            clazzScheduleId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            clazzId: {
                type: Sequelize.STRING,
                references: {
                    model: 'Clazz',
                    key: 'clazzId'
                }
            },
            scheduleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Schedules',
                    key: 'scheduleId'
                }
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
        await queryInterface.dropTable('Clazz_Schedules');
    }
};