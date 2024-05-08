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
    return queryInterface.bulkInsert('Lessions', [
      {
        lessionId: 1,
        key: 'T1-3',
        value: 'Tiết 1-3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lessionId: 2,
        key: 'T4-6',
        value: 'Tiết 4-6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lessionId: 3,
        key: 'T7-9',
        value: 'Tiết 7-9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lessionId: 4,
        key: 'T10-12',
        value: 'Tiết 10-12',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lessionId: 5,
        key: 'T13-15',
        value: 'Tiết 13-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
