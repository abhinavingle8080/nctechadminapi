'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleModule.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true
    },
    route: {
      type: DataTypes.STRING,
      allowNull: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_header_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_dropdown: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0
    },
    is_readonly: {
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
    modelName: 'RoleModule',
    tableName: 'role_modules',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  });

  RoleModule.associate = function (models) {
    RoleModule.hasMany(RoleModule, { as: 'childrens', foreignKey: 'parent_id', sourceKey: 'id'});
    RoleModule.hasOne(models.RolePermission, {
      sourceKey: 'id',
      foreignKey: 'module_id',
      constraints: false,
      as: 'RolePermission'
    });

    RoleModule.hasOne(models.RoleModuleHeader, {
      sourceKey: 'sub_header_id',
      foreignKey: 'id',
      constraints: false,
      as: 'SubHeader'
    });
  };

  return RoleModule;
};