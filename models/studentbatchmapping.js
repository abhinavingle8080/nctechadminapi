'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StudentBatchMapping extends Model {
    static associate(models) {
      // Define associations here if needed
      // Example:
      // StudentBatchMapping.belongsTo(models.Student, { foreignKey: 'student_id' });
      // StudentBatchMapping.belongsTo(models.Batch, { foreignKey: 'batch_id' });
    }
  }

  StudentBatchMapping.init({
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id'
      }
    },
    batch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'batches',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'StudentBatchMapping',
    tableName: 'student_batch_mappings', 
    underscored: true,
    timestamps: true, 
    paranoid: true,
  });

  return StudentBatchMapping;
};
