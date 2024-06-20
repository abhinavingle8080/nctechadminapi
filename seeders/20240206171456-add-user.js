'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
    {
      first_name: "Super",
      last_name: "Admin",
      email: "superadmin@nctechadmin.com",
      password: "$2b$10$/zdWH2dwpJ/wdLyRRAejM.PL3Xgzx8.BXYiKIXtMAXle0.CK5Kzg.",
      role_id: 1,
      designation_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all rows from the 'Users' table
    await queryInterface.bulkDelete('users', null, {});
  },
};