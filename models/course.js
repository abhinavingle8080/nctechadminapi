'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Course.init({
    course_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    fees: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount_fees: {
      type: DataTypes.DECIMAL
    },
    duration: {
      type: DataTypes.INTEGER
    },
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    location: {
      type: DataTypes.STRING
    },
    max_capacity: {
      type: DataTypes.INTEGER
    },
    current_capacity: {
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.INTEGER
    },
    updated_by: {
      type: DataTypes.INTEGER
    },
    deleted_by: {
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      defaultValue: 'Active',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'courses', // Define table name
    deletedAt: 'deleted_at', // Define deletedAt column
    createdAt: 'created_at', // Define createdAt column
    updatedAt: 'updated_at', // Define updatedAt column
    paranoid: true, // Enable soft delete
    underscored: true // Use underscored naming convention for table and attributes
  });

  return Course;
};
