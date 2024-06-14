const { Student, Payment } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");

// Get all students with pagination and search
const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const students = await Student.findAndCountAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "birth_date",
        "country_code",
        "phone_no",
        "education",
        "college",
        "parents_contact_no",
        "profile_image",
        "id_proof",
        "admission_date",
        "status",
        "created_at",
        "updated_at",
        "deleted_at",
      ],
      include: [
        {
          model: Payment,
          as: "payments",
          attributes: ["id", "paid_amount", "due_amount", "payment_date"],
        },
      ],
      offset: offset,
      limit: parseInt(limit),
      order: [["id", "ASC"]],
      where: {
        [Op.or]: [
          { first_name: { [Op.like]: `%${search}%` } },
          { last_name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Students retrieved successfully",
      data: students,
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

// Create a new student
const createStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      birth_date,
      country_code,
      phone_no,
      education,
      college,
      parents_contact_no,
      profile_image,
      id_proof,
      admission_date,
      status,
    } = req.body;

    const existingStudent = await Student.findOne({
      where: {
        email: email,
      },
    });

    if (existingStudent) {
      return res.status(constants.STATUS_CODES.VALIDATION).json({
        statusCode: constants.STATUS_CODES.VALIDATION,
        message: "Email already exists",
      });
    }

    const newStudent = await Student.create({
      first_name,
      last_name,
      email,
      birth_date,
      country_code,
      phone_no,
      education,
      college,
      parents_contact_no,
      profile_image,
      id_proof,
      admission_date,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Student created successfully",
      data: newStudent,
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

// Get a single student by ID
const getStudent = async (req, res) => {
  try {
    const { student_id } = req.body;

    const student = await Student.findOne({
      where: { id: student_id },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "birth_date",
        "country_code",
        "phone_no",
        "education",
        "college",
        "parents_contact_no",
        "profile_image",
        "id_proof",
        "admission_date",
        "status",
        "created_at",
        "updated_at",
        "deleted_at",
      ],
      include: [
        {
          model: Payment,
          as: "payments",
          attributes: ["id", "paid_amount", "due_amount", "payment_date"],
        },
      ],
    });

    if (!student) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Student not found",
      });
    }

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Student retrieved successfully",
      data: student,
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

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      birth_date,
      country_code,
      phone_no,
      education,
      college,
      parents_contact_no,
      profile_image,
      id_proof,
      admission_date,
      status,
    } = req.body;
    const { student_id } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Student not found",
      });
    }

    await student.update({
      first_name,
      last_name,
      email,
      birth_date,
      country_code,
      phone_no,
      education,
      college,
      parents_contact_no,
      profile_image,
      id_proof,
      admission_date,
      status,
      updated_at: new Date(),
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Student updated successfully",
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

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const { student_id } = req.body; // Using req.body to get student_id

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Student not found",
      });
    }

    await student.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Student deleted successfully",
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
  getAllStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
};
