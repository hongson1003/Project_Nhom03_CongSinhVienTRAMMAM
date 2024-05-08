'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Clazzs', {
            ClazzId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            teacherId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            maxQuantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('CHUA_MO', 'DANG_MO', 'DA_DONG'),
                allowNull: false,
                defaultValue: 'CHUA_MO',
            },
            courseRegisterId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Course_Registers',
                    key: 'registerId'
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
        await queryInterface.dropTable('Clazzs');
    }
};