'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Specializes', {
            specializeId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            departmentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Departments',
                    key: 'departmentId'
                }
            },
            description: {
                type: Sequelize.STRING,
            },
            totalCredits: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            numberOfYearsTraining: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('Specializes');
    }
};