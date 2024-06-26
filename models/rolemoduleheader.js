'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleModuleHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoleModuleHeader.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    }
  }, {
    sequelize,
    modelName: 'RoleModuleHeader',
    tableName: 'role_module_headers',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    underscored: true,
  });

  RoleModuleHeader.associate = function (models) {
    RoleModuleHeader.hasMany(models.RoleModule, {
      foreignKey: 'sub_header_id',
      as: 'Modules',
    });
  };

  return RoleModuleHeader;
};