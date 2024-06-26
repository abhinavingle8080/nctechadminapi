'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class NoteFile extends Model {
    static associate(models) {
      NoteFile.hasOne(models.Note, {
        foreignKey: 'noteFile_id',
        as: 'note',
      });
    }
  }

  NoteFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      note_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'NoteFile',
      tableName: 'note_files',
      timestamps: false,
    }
  );

  return NoteFile;
};
