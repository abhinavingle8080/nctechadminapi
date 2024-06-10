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
    await queryInterface.bulkInsert('roles', [{
      role: 'SuperAdmin',
      label: 'Super Admin',
      description : "This is Super Admin",
      created_at: new Date(),
      updated_at: new Date(),
    },{
      role: 'Employee',
      label: 'Employee',
      description : "This is Employee",
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
