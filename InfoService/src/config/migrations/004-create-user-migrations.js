'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Users', {
            codeId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            gender: {
                type: Sequelize.STRING,
            },
            birthdate: {
                type: Sequelize.DATE,
            },
            address: {
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING,
            },
            placeOfBirth: {
                type: Sequelize.STRING,
            },
            nation: {
                type: Sequelize.STRING,
            },
            schoolEntryDate: {
                type: Sequelize.DATE,
            },
            profileCode: {
                type: Sequelize.STRING,
            },
            basisId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Bases',
                    key: 'basisId'
                }
            },
            specializeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Specializes',
                    key: 'specializeId'
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
        await queryInterface.dropTable('Users');
    }
};