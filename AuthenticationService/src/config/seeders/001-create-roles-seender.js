'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Roles', [
      {
        roleId: 1,
        key: 'ADMIN',
        description: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 2,
        key: 'STUDENT',
        description: 'Student',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: 3,
        key: 'TEACHER',
        description: 'Teacher',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
