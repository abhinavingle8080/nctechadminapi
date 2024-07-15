'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      // define association here
    }
  }
  RolePermission.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: { model: "roles", key: "id" },
      allowNull: false,
      onDelete: "CASCADE"
    },
    module_id: {
      type: DataTypes.INTEGER,
      references: { model: "role_modules", key: "id" },
      allowNull: false,
      onDelete: "CASCADE"
    },
    is_read: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    is_create: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    is_edit: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    is_delete: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  });
  return RolePermission;
};