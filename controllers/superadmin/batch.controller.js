const { Batch,  Course, Student, Teacher } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];

const getAllBatches = async (req, res) => {
  try {
    const body = req.body;
    const batches = await Batch.findAndCountAll({
      attributes: [
        "id",
        "batch_name",
        "description",
        "course_id",
        "start_date",
        "end_date",
        "teacher_id",
        "icon_url",
        "created_at",
        "updated_at",
      ],
      offset: (parseInt(body.page) - 1) * parseInt(body.limit),
      limit: parseInt(body.limit),
      order: [["id", "ASC"]],
      where: {
        [Op.or]: [
          {
            batch_name: {
              [Op.like]: `%${body.search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${body.search}%`,
            },
          },
        ],
      },
    });
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Batches retrieved successfully",
      data: batches,
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.BAD_REQUEST).json({
      statusCode: constants.STATUS_CODES.BAD_REQUEST,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const createBatch = async (req, res) => {
  try {
    const body = req.body;
    const existingBatch = await Batch.findOne({
      where: {
        batch_name: body.batch_name,
      },
    });

    if (existingBatch) {
      return res.status(constants.STATUS_CODES.VALIDATION).json({
        statusCode: constants.STATUS_CODES.VALIDATION,
        message: "Batch name already exists",
      });
    }

    const batch_data = await Batch.create({
      batch_name: body.batch_name,
      description: body.description,
      course_id: body.course_id,
      start_date: body.start_date,
      end_date: body.end_date,
      teacher_id: body.teacher_id,
      icon_url: body.icon_url,
      created_at: new Date(),
      updated_at: new Date(),
    });



    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Batch created successfully",
      data: batch_data, // Return the created batch data
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getBatch = async (req, res) => {
  try {
    const body = req.body;
    const batch = await Batch.findOne({
      attributes: [
        "id",
        "batch_name",
        "description",
        "course_id",
        "start_date",
        "end_date",
        "teacher_id",
        "icon_url",
        "created_at",
        "updated_at",
      ],
      where: {
        id: body.id,
      },
    });
    if (!batch) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Batch not found",
      });
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Batch retrieved successfully",
      data: batch,
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBatch = async (req, res) => {
  try {
    const body = req.body;
    const batch = await Batch.findOne({
      where: {
        id: body.id,
      },
    });

    if (!batch) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Batch not found",
      });
    }

    await batch.update(
      {
        batch_name: body.batch_name,
        description: body.description,
        course_id: body.course_id,
        start_date: body.start_date,
        end_date: body.end_date,
        teacher_id: body.teacher_id,
        icon_url: body.icon_url,
        updated_at: new Date(),
      },
      {
        where: {
          id: body.batch_id,
        },
      }
    );

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Batch updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const body = req.body;
    const batch = await Batch.findOne({
      where: {
        id: body.id,
      },
    });
    if (!batch) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Batch not found",
      });
    }
    await batch.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Batch deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllBatches,
  createBatch,
  getBatch,
  updateBatch,
  deleteBatch,
};
