"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TeamMember.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "teams", key: "id" },
        // onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        // onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
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
      modelName: "TeamMember",
      tableName: "team_members",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  TeamMember.associate = function (models) {
    TeamMember.belongsTo(models.User, {
      scourceKey: "id",
      foreignKey: "emp_id",
      as: "Employee",
      onDelete: "cascade",
    });
  };

  return TeamMember;
};
