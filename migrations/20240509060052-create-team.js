'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('Team', 'Designation'),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
     created_at: {
       type: Sequelize.DATE,
       allowNull: false
     },
     updated_at: {
       type: Sequelize.DATE,
       allowNull: true
     }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};