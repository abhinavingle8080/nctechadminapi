'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
          allowNull:false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull:false
      },
      date_of_birth: {
        type: Sequelize.STRING,
        allowNull:true
      },
      phone_no: {
        type: Sequelize.STRING,
        allowNull:false
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull:false
      },
      address: {
        type: Sequelize.STRING,
        allowNull:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
    }
  }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};