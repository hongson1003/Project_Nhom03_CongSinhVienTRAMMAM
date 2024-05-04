'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('User_Banks', {
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            bankId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            cardNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
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
        await queryInterface.dropTable('User_Banks');
    }
};