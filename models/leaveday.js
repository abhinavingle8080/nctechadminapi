'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LeaveDay.init({
    leave_id: {
      type: DataTypes.INTEGER,
      references: { model: "leaves", key: "id" },
      onDelete: "CASCADE",
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration : {
      type : DataTypes.ENUM('FullDay', 'FirstHalf', 'SecondHalf'),
      allowNull : false,
      defaultValue: 'FullDay'
    },
    is_holiday : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue: false
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'LeaveDay',
    tableName: 'leave_days',
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true,
  });
  return LeaveDay;
};