'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: { model: "roles", key: "id" },
        allowNull: false
      },
      module_id: {
        type: Sequelize.INTEGER,
        references: { model: "role_modules", key: "id" },
        allowNull: false
      },
      is_read: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
      },
      is_create: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
      },
      is_edit: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
      },
      is_delete: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_permissions');
  }
};