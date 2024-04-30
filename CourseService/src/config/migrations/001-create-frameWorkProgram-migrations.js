'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('FrameWorkPrograms', {
            frameWorkId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            totalCredits: {
                type: Sequelize.INTEGER,
            },
            specializeId: {
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
        await queryInterface.dropTable('FrameWorkPrograms');
    }
};