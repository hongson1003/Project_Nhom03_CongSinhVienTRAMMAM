'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('Detail_Certification_Users', {
            certificationId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Certifications',
                    key: 'certificationId'
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
            achievedDate: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('Detail_Certification_User');
    }
};