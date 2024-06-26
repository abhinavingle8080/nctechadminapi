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
    await queryInterface.bulkInsert('role_permissions', [{
      role_id: 1,
      module_id: 1,
      is_read: true,
      is_create: true,
      is_edit: true,
      is_delete: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      role_id: 1,
      module_id: 2,
      is_read: true,
      is_create: true,
      is_edit: true,
      is_delete: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      role_id: 1,
      module_id: 3,
      is_read: true,
      is_create: true,
      is_edit: true,
      is_delete: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      role_id: 1,
      module_id: 4,
      is_read: true,
      is_create: true,
      is_edit: true,
      is_delete: true,
      created_at: new Date(),
      updated_at: new Date(),
    }])
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
