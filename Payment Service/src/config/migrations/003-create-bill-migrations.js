'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Bills', {
            joinClazzId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            semester: {
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
        await queryInterface.dropTable('Bills');
    }
};