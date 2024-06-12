'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_name: {
        type: Sequelize.STRING(100),
        allowNull: false // Course name cannot be null
      },
      description: {
        type: Sequelize.TEXT
      },
      fees: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false // Fees cannot be null
      },
      discount_fees: {
        type: Sequelize.DECIMAL(10, 2)
      },
      duration: {
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING(100)
      },
      max_capacity: {
        type: Sequelize.INTEGER
      },
      current_capacity: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      deleted_by: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Set default value to current timestamp
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Set default value to current timestamp
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'), // Define ENUM values 'Active' and 'Inactive'
        defaultValue: 'Active' // Set default value to 'Active'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};
