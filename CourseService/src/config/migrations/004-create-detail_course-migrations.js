'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Detail_Courses', {
            courseId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                references: {
                    model: 'Courses',
                    key: 'courseId'
                },
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
                allowNull: false,
                references: {
                    model: 'Courses',
                    key: 'courseId'
                },
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
        await queryInterface.dropTable('Detail_Courses');
    }
};