'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notice.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    posted_by: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: true,
      defaultValue:"Admin"
    },
    date_posted: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiration_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM("Notice", "Event", "Announcement"),
      allowNull: false,
      defaultValue: "Notice"
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visibility: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attachments: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true
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
    }

    
  }, {
    sequelize,
    modelName: 'Notice',
    tableName: "notices",
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true,
  });
  return Notice;
};