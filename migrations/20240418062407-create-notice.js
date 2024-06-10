'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      posted_by: {
        type: Sequelize.ENUM("Admin", "User"),
        allowNull: true,
        defaultValue:"Admin"
      },
      date_posted: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM("Notice", "Event", "Announcement"),
        allowNull: false,
        defaultValue: "Notice"
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: false
      },
      visibility: {
        type: Sequelize.ENUM("Public", "Private"),
        allowNull: true
      },
      attachments: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM("Active", "Inactive"),
        allowNull: true
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: true
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
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notices');
  }
};