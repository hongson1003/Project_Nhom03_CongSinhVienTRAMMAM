'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Banks', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            branchName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cardNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            accountNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            userId: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Banks');
    }
};