'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leave_days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      leave_id: {
        type: Sequelize.INTEGER,
        references: { model: "leaves", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duration : {
        type : Sequelize.ENUM('FullDay', 'FirstHalf', 'SecondHalf'),
        allowNull : false,
        defaultValue: 'FullDay'
      },
      is_holiday : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leave_days');
  }
};