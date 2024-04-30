'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Detail_Course', {
            courseId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            price: {
                type: Sequelize.INTEGER,
            },
            numberOfCredits: {
                type: Sequelize.STRING,
            },
            prerequisiteId: {
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
        await queryInterface.dropTable('Detail_Course');
    }
};