'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('designations', [
      { title: 'Manager', created_at: new Date(), updated_at: new Date() },
      { title: 'Developer', created_at: new Date(), updated_at: new Date() },
      { title: 'Designer', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('designations', null, {});
  }
};
