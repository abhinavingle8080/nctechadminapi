// controllers/superadmin/note.controller.js

"use strict";

const { Note } = require('../../models'); // Adjust path based on your actual structure
const constants = require("../../config/constants");
const helper = require("../../helpers/fileupload.helper");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = 'storage/images/notes';
    const fullPath = path.join(__dirname, '..', '..', uploadFolder); // Adjust path here
    // Ensure folder exists; create if not
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: function (req, file, cb) {
    // Use original file name or generate unique name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file'); // Assuming single file upload

const createNote = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer error:", err);
        return res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: "Error uploading file",
          error: err.message,
        });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown error:", err);
        return res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: "Unknown error uploading file",
          error: err.message,
        });
      }

      // File uploaded successfully, proceed to create note
      const { title, description, status } = req.body;
      const note_url = req.file ? `storage/images/notes/${req.file.filename}` : null;

      const note = await Note.create({
        title,
        description,
        status,
        note_url,
      });

      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: "Note created successfully",
        data: note,
      });
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const { page, limit } = req.body;
    const notes = await Note.findAndCountAll({
      offset: (parseInt(page) - 1) * parseInt(limit),
      limit: parseInt(limit),
      order: [["id", "DESC"]],
      attributes: ["id", "title", "description", "status", "note_url"],
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { note_id } = req.body;
    const note = await Note.findByPk(note_id, {
      attributes: ["id", "title", "description", "status", "note_url"],
    });

    if (!note) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Note not found",
      });
    }

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer error:", err);
        return res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: "Error uploading file",
          error: err.message,
        });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("Unknown error:", err);
        return res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
          statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
          message: "Unknown error uploading file",
          error: err.message,
        });
      }

      // File uploaded successfully, proceed to update note
      const { note_id, title, description, status } = req.body;
      const note_url = req.file ? `storage/images/notes/${req.file.filename}` : null;

      const note = await Note.findByPk(note_id);

      if (!note) {
        return res.status(constants.STATUS_CODES.NOT_FOUND).json({
          statusCode: constants.STATUS_CODES.NOT_FOUND,
          message: "Note not found",
        });
      }

      await note.update({
        title,
        description,
        status,
        note_url,
        updated_at: new Date(),
      });

      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: "Note updated successfully",
        data: note,
      });
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { note_id } = req.body;

    const note = await Note.findByPk(note_id);

    if (!note) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Note not found",
      });
    }

    await note.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Note deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
