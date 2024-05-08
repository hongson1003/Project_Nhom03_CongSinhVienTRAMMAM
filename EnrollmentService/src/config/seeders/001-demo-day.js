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
    return queryInterface.bulkInsert('Days', [
      {
        dayId: 1,
        key: 'MON',
        value: 'Monday',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayId: 2,
        key: 'TUE',
        value: 'Tuesday',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayId: 3,
        key: 'WED',
        value: 'Wednesday',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayId: 4,
        key: 'THU',
        value: 'Thursday',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayId: 5,
        key: 'FRI',
        value: 'Friday',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayId: 6,
        key: 'SAT',
        value: 'Saturday',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dayId: 7,
        key: 'SUN',
        value: 'Sunday',
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
