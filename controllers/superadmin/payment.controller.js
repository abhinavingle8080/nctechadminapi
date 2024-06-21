const { Payment, Student, Course } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];
const { generateInvoiceNumber } = require("../../helpers/generateInvoiceNumber");
const {createInvoice} = require("../../helpers/createInvoice");
const fs = require("fs");
const moment = require("moment");

const getPaymentById = async (payment_id) => {
  return await Payment.findOne({
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
      [Sequelize.fn("concat", `${config.STORAGE_BASE_URL}/`, Sequelize.col("invoice_url")), "invoice_url"],
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
        attributes: ["id", "course_name", "fees", "discount_fees"],
      },
    ],
    where: { id: payment_id },
  });
};

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
        [Sequelize.fn("concat", `${config.STORAGE_BASE_URL}/`, Sequelize.col("invoice_url")), "invoice_url"],
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
          attributes: ["id", "course_name", "fees", "discount_fees"],
        },
      ],
      offset: offset,
      limit: parseInt(limit),
      order: [["id", "ASC"]],
      where: {
        [Op.or]: [
          { '$Student.first_name$': { [Op.like]: `%${search}%` } },
          { '$Student.last_name$': { [Op.like]: `%${search}%` } },
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
    const {
      student_id,
      course_id,
      payment_method,
      paid_amount,
      due_amount,
      payment_status,
      created_by,
      updated_by,
    } = req.body;

    const fileName = moment().format("YYYY-MM-DD-HH-mm-ss") + ".pdf";
    const payment_date = req.body.payment_date || new Date();
    const invoice = await generateInvoiceNumber();
    const payment_data = await Payment.create({
      student_id,
      course_id,
      payment_method,
      paid_amount,
      due_amount,
      payment_date,
      payment_status,
      invoice_number: invoice,
      invoice_url: "invoice/" + fileName,
      created_by,
      updated_by,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const getStudentDetails = await Student.findOne({
      attributes: ["first_name", "last_name" , "phone_no"],
      where: { id: student_id },
    });

    const getCourseDetails = await Course.findOne({
      attributes: ["course_name", "fees", "discount_fees","type"],
      where: { id: course_id },
    });

    const getPaymentDetails = await getPaymentById(payment_data.id);

    const data = {
      images: {
        background: fs.readFileSync("invoiceBackImage.png", "base64"),
      },
      sender: {
        company:
          "Non Criterion Technology",
        address: "Saraswati Apartment Buldhana",
        zip: "440024",
        city: "Buldhana",
        country: "India",
      },
      client: {
        company: getStudentDetails.first_name + " " + getStudentDetails.last_name,
        contact: getStudentDetails.phone_no,
        address: "Buldhana Maharashtra",
        zip: "440024",
        city: "Buldhana",
        country: "India",
      },
      information: {
        number: " ",
        date: moment().format("YYYY-MM-DD-hh-mm-ss"),
      },
      products: [
        {
          name: getCourseDetails.course_name,
          amount: paid_amount,
          discount: "       -       ",
          price: paid_amount,
          total: paid_amount,
        },
      ],
      "bottom-notice": "Thank you for choosing us.",
      settings: {
        currency: "INR",
        locale: "en-IN",
        "tax-notation": "gst",
        "margin-top": 50,
        "margin-right": 50,
        "margin-left": 50,
        "margin-bottom": 50,
      },
      translate: {
        invoice: "Payment Receipt",
        number: "Invoice",
        products: "Items",
        price: " ",
        total: " ",
      },
    };

    if (!fs.existsSync("storage/invoice")) {
      fs.mkdirSync("storage/invoice", { recursive: true });
    }

    createInvoice(data, "storage/invoice/" + fileName);

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
    const payment = await getPaymentById(payment_id);
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
        payment_date: payment_date || payment.payment_date,
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
