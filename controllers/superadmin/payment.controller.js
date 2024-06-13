const { Payment, Student, Course } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];

const getAllPayments = async (req, res) => {
  try {
    const body = req.body;
    const payments = await Payment.findAndCountAll({
      attributes: [
        "id",
        "student_id",
        "course_id",
        "payment_method",
        "transaction_id",
        "paid_amount",
        "due_amount",
        "payment_date",
        "payment_status",
        "payment_confirmation_number",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
        "deleted_at"
      ],
      include: [
        {
          model: Student,
          as: "Student",
          attributes: ["id", "name"]
        },
        {
          model: Course,
          as: "Course",
          attributes: ["id", "course_name"]
        }
      ],
      offset: (parseInt(body.page) - 1) * parseInt(body.limit),
      limit: parseInt(body.limit),
      order: [["id", "ASC"]],
      where: {
        [Op.or]: [
          {
            transaction_id: {
              [Op.like]: `%${body.search}%`
            }
          },
          {
            payment_status: {
              [Op.like]: `%${body.search}%`
            }
          }
        ]
      }
    });
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payments retrieved successfully",
      data: payments
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.BAD_REQUEST).json({
      statusCode: constants.STATUS_CODES.BAD_REQUEST,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const createPayment = async (req, res) => {
  try {
    const body = req.body;
    const existingPayment = await Payment.findOne({
      where: {
        transaction_id: body.transaction_id
      }
    });

    if (existingPayment) {
      return res.status(constants.STATUS_CODES.VALIDATION).json({
        statusCode: constants.STATUS_CODES.VALIDATION,
        message: "Transaction ID already exists"
      });
    }

    const payment_data = await Payment.create({
      student_id: body.student_id,
      course_id: body.course_id,
      payment_method: body.payment_method,
      transaction_id: body.transaction_id,
      paid_amount: body.paid_amount,
      due_amount: body.due_amount,
      payment_date: body.payment_date,
      payment_status: body.payment_status,
      payment_confirmation_number: body.payment_confirmation_number,
      created_by: body.created_by,
      updated_by: body.updated_by,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment created successfully",
      data: payment_data // Return the created payment data
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const getPayment = async (req, res) => {
  try {
    const body = req.body;
    const payment = await Payment.findOne({
      attributes: [
        "id",
        "student_id",
        "course_id",
        "payment_method",
        "transaction_id",
        "paid_amount",
        "due_amount",
        "payment_date",
        "payment_status",
        "payment_confirmation_number",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
        "deleted_at"
      ],
      include: [
        {
          model: Student,
          as: "Student",
          attributes: ["id", "name"]
        },
        {
          model: Course,
          as: "Course",
          attributes: ["id", "course_name"]
        }
      ],
      where: {
        id: body.payment_id
      }
    });
    if (!payment) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Payment not found"
      });
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment retrieved successfully",
      data: payment
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const body = req.body;
    const payment = await Payment.findOne({
      where: {
        id: body.payment_id
      }
    });

    if (!payment) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Payment not found"
      });
    }

    await payment.update(
      {
        student_id: body.student_id,
        course_id: body.course_id,
        payment_method: body.payment_method,
        transaction_id: body.transaction_id,
        paid_amount: body.paid_amount,
        due_amount: body.due_amount,
        payment_date: body.payment_date,
        payment_status: body.payment_status,
        payment_confirmation_number: body.payment_confirmation_number,
        created_by: body.created_by,
        updated_by: body.updated_by,
        updated_at: new Date()
      },
      {
        where: {
          id: body.payment_id
        }
      }
    );

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    const body = req.body;
    const payment = await Payment.findOne({
      where: {
        id: body.payment_id
      }
    });
    if (!payment) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Payment not found"
      });
    }
    await payment.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Payment deleted successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

module.exports = {
  getAllPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment
};
