"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Leave.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration : {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending",
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
    },
    {
      sequelize,
      modelName: "Leave",
      tableName: "leaves",
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      underscored: true,
    }
  );

  Leave.associate = (models) => {
    Leave.belongsTo(models.User, {
      foreignKey: "employee_id",
      as: "Employee",
    });

    Leave.hasMany(models.LeaveDay, {
      foreignKey: "leave_id",
      as: "LeaveDays",
      onDelete: "cascade",
    });
  };

  return Leave;
};
