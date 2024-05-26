'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Tokens', {
            tokenId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'codeId'
                }
            },
            accesss_token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            refresh_token: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdTime: {
                type: Sequelize.DATE,
            },
            expiredTime: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('Tokens');
    }
};