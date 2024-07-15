'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role_module_headers', [{
      name: 'General',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      name: 'Operation',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      name: 'Content Management',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      name: 'System',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};