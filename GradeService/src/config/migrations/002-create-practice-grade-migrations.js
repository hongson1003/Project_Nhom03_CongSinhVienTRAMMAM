'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Practice_Grades', {
            joinClazzId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
            score1: {
                type: Sequelize.FLOAT,
            },
            score2: {
                type: Sequelize.FLOAT,
            },
            score3: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('Practice_Grades');
    }
};