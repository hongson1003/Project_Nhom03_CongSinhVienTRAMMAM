'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Join_Clazzs', {
            joinClazzId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            clazzScheduleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Clazz_Schedules',
                    key: 'clazzScheduleId'
                }
            },
            studentId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            groupPractise: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Join_Clazzs');
    }
};