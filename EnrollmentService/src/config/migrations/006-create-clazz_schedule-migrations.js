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
                    model: 'Clazzs',
                    key: 'clazzId'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            dayId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Days',
                    key: 'dayId'
                },
            },
            lessionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Lessions',
                    key: 'lessionId'
                },
            },
            startTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            groupPractise: {
                type: Sequelize.INTEGER,
            },
            endTime: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('Clazz_Schedules');
    }
};