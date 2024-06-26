'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Student extends Model {
    static associate(models) {
      // Define associations here
      
      Student.belongsTo(models.Course, {
        foreignKey: "course_id",
        as: "course",
      });
    }
  }

  Student.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      country_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      education: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      college: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parents_contact_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id_proof: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admission_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active',
      },
     
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students',
      underscored: true,
      timestamps: true,
      paranoid: true,
      createdAt:'created_at',
      updatedAt:'updated_at'
    }
  );

  return Student;
};
