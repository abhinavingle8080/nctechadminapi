'use strict';

const { NoteFile } = require('../../models');
const constants = require('../../config/constants');

const createNoteFile = async (req, res) => {
  try {
    const { note_id, file_Name, file_Path, note_url } = req.body;

    const noteFile = await NoteFile.create({
      note_id,
      file_Name,
      file_Path,
      note_url,
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Note file created successfully',
      data: noteFile,
    });
  } catch (error) {
    console.error('Error creating note file:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getAllNoteFiles = async (req, res) => {
    try {
      const { page, limit } = req.body;
  
      const noteFiles = await NoteFile.findAndCountAll({
        offset: (parseInt(page) - 1) * parseInt(limit),
        limit: parseInt(limit),
        order: [['note_id', 'DESC']],
        attributes: [
          'note_id',
          'file_Name',
          'file_Path',
          'note_url',
        ],
      });
  
      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: 'Note files retrieved successfully',
        data: noteFiles,
      });
    } catch (error) {
      console.error('Error fetching note files:', error);
      res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };
  const getNoteFileById = async (req, res) => {
  try {
    const { note_id } = req.body;
    const noteFile = await NoteFile.findOne({
      where: {
        note_id,
      },
      attributes: [
        'note_id',
        'file_Name',
        'file_Path',
        'note_url',

      ],
    });

    if (noteFile) {
      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: 'Note file retrieved successfully',
        data: noteFile,
      });
    } else {
      res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Note file not found',
      });
    }
  } catch (error) {
    console.error('Error fetching note file by ID:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const updateNoteFile = async (req, res) => {
  try {
    const { note_id } = req.body;
    const { file_Name, file_Path, note_url } = req.body;

    const noteFile = await NoteFile.findOne({
      where: {
        note_id,
      },
    });

    if (!noteFile) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Note file not found',
      });
    }

    await noteFile.update({
      file_Name,
      file_Path,
      note_url,
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Note file updated successfully',
      data: noteFile,
    });
  } catch (error) {
    console.error('Error updating note file:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const deleteNoteFile = async (req, res) => {
  try {
    const { note_id } = req.body;

    const noteFile = await NoteFile.findOne({
      where: {
        note_id,
      },
    });

    if (!noteFile) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Note file not found',
      });
    }

    await noteFile.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Note file deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting note file:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  createNoteFile,
  getAllNoteFiles,
  getNoteFileById,
  updateNoteFile,
  deleteNoteFile,
};
