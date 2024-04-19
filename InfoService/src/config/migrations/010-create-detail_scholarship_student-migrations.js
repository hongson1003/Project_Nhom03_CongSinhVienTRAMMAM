'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Detail_ScholarShips_Students', {
            scholarShipId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'ScholarShips',
                    key: 'scholarShipId'
                }
            },
            userId: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'codeId'
                }
            },
            semester: {
                type: Sequelize.STRING,
                allowNull: false
            },
            scholarShipAmount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            scholarShipProvider: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('Detail_ScholarShip_Student');
    }
};