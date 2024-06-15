const { Payment, Student, Course } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];

const getAllPayments = async (req, res) => {
  try {
    const { page, limit, search } = req.body;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const payments = await Payment.findAndCountAll({
      attributes: [
        "id",
        "student_id",
        "course_id",
        "payment_method",
        "paid_amount",
        "due_amount",
        "payment_date",
        "payment_status",
        "invoice_number",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
        "deleted_at",
      ],
      include: [
        {
          model: Student,
          as: "Student",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Course,
          as: "Course",
          attributes: ["id", "course_name"],
        },
      ],
      offset: offset,
      limit: parseInt(limit),
      order: [["id", "ASC"]],
      where: {
        [Op.or]: [
          { payment_status: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payments retrieved successfully",
      data: payments,
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

const createPayment = async (req, res) => {
  try {
    const body = req.body;

    const payment_data = await Payment.create({
      student_id: body.student_id,
      course_id: body.course_id,
      payment_method: body.payment_method,
      paid_amount: body.paid_amount,
      due_amount: body.due_amount,
      payment_date: body.payment_date,
      payment_status: body.payment_status,
      invoice_number: body.invoice_number,
      created_by: body.created_by,
      updated_by: body.updated_by,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment created successfully",
      data: payment_data, // Return the created payment data
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

const getPayment = async (req, res) => {
  try {
    const { payment_id } = req.body;
    if (!payment_id) {
      return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
        statusCode: constants.STATUS_CODES.BAD_REQUEST,
        message: "Payment ID is required",
      });
    }
    const payment = await Payment.findOne({
      attributes: [
        "id",
        "student_id",
        "course_id",
        "payment_method",
        "paid_amount",
        "due_amount",
        "payment_date",
        "payment_status",
        "invoice_number",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
        "deleted_at",
      ],
      include: [
        {
          model: Student,
          as: "Student",
          attributes: ["id", "first_name", "last_name", "email"],
        },
        {
          model: Course,
          as: "Course",
          attributes: ["id", "course_name"],
        },
      ],
      where: { id: payment_id },
    });
    if (!payment) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Payment not found",
      });
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment retrieved successfully",
      data: payment,
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

const updatePayment = async (req, res) => {
  try {
    const {
      payment_id,
      student_id,
      course_id,
      payment_method,
      paid_amount,
      due_amount,
      payment_date,
      payment_status,
      invoice_number,
      created_by,
      updated_by,
    } = req.body;

    if (!payment_id) {
      return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
        statusCode: constants.STATUS_CODES.BAD_REQUEST,
        message: "Payment ID is required",
      });
    }

    const payment = await Payment.findOne({ where: { id: payment_id } });

    if (!payment) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Payment not found",
      });
    }

    await payment.update(
      {
        student_id,
        course_id,
        payment_method,
        paid_amount,
        due_amount,
        payment_date,
        payment_status,
        invoice_number,
        created_by,
        updated_by,
        updated_at: new Date(),
      },
      {
        where: { id: payment_id },
      }
    );

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment updated successfully",
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

const deletePayment = async (req, res) => {
  try {
    const { payment_id } = req.body;
    if (!payment_id) {
      return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
        statusCode: constants.STATUS_CODES.BAD_REQUEST,
        message: "Payment ID is required",
      });
    }
    const payment = await Payment.findOne({ where: { id: payment_id } });
    if (!payment) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Payment not found",
      });
    }
    await payment.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment deleted successfully",
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
  getAllPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
};
