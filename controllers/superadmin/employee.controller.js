const { User, Designation } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const app = require("../../services/app.service");
const passport = require("passport");
const config = require("../../config/app.json")[app["env"]];
const bcrypt = require("bcrypt");

const getAllEmployees = async (req, res) => {
  try {
    const body = req.body;
    const employees = await User.findAndCountAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "gender",
        "date_of_birth",
        "phone_no",
        "country_code",
        "address",
        "created_at",
        "emp_start_date",
        "emp_end_date",
        "employment_status",
        "status",
        "designation_id",
        [Sequelize.fn("concat", `${config.IMAGE_PATH}/`, Sequelize.col("profile_image")), "profile_image"],
      ],
      include: [
        {
          model: Designation,
          as: "Designation",
          attributes: ["id", "title"],
        },
      ],
      offset: (parseInt(body.page) - 1) * parseInt(body.limit),
      limit: parseInt(body.limit),
      order: [["id", "ASC"]],
      where: {
        role_id: constants.ROLES.EMPLOYEE,
        [Op.or]: [
          {
            first_name: {
              [Op.like]: `%${body.search}%`,
            },
          },
          {
            last_name: {
              [Op.like]: `%${body.search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${body.search}%`,
            },
          },
        ],
      },
    });
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Employees retrieved successfully",
      data: employees,
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

const createEmployee = async (req, res) => {
  let defaultPassword;
  try {
    const body = req.body;
    const saltRounds = 10;
    defaultPassword = bcrypt.hashSync(constants.DEFAULT_PASSWORD, saltRounds);
    const existingEmployee = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (existingEmployee) {
      return res.status(constants.STATUS_CODES.VALIDATION).json({
        statusCode: constants.STATUS_CODES.VALIDATION,
        message: "Email already exists",
      });
    }

    const employee_data = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: defaultPassword,
      country_code: body.country_code,
      gender: body.gender,
      designation_id: body.designation_id,
      date_of_birth: body.date_of_birth,
      emp_start_date: body.emp_start_date,
      emp_end_date: body.emp_end_date,
      employment_status: body.employment_status,
      phone_no: body.phone_no,
      address: body.address,
      role_id: constants.ROLES.EMPLOYEE,
      status: body.status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "User created successfully",
      data: employee_data, // Return the created employee data
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

const getEmployee = async (req, res) => {
  try {
    const body = req.body;
    const employee = await User.findOne({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "gender",
        "date_of_birth",
        "phone_no",
        "country_code",
        "address",
        "created_at",
        "emp_start_date",
        "emp_end_date",
        "employment_status",
        "status",
        "designation_id",
        [Sequelize.fn("concat", `${config.IMAGE_PATH}/`, Sequelize.col("profile_image")), "profile_image"],
      ],
      include: [
        {
          model: Designation,
          as: "Designation",
          attributes: ["id", "title"],
        },
      ],
      where: {
        id: body.employee_id,
        role_id: constants.ROLES.EMPLOYEE,
      },
    });
    if (!employee) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "User not found",
      });
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "User retrieved successfully",
      data: employee,
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

const updateEmployee = async (req, res) => {
  try {
    const body = req.body;
    const employee = await User.findOne({
      where: {
        id: body.employee_id,
      },
    });

    if (!employee) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "User not found",
      });
    }

    await employee.update(
      {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: body.password,
        country_code: body.country_code,
        gender: body.gender,
        designation_id: body.designation_id,
        date_of_birth: body.date_of_birth,
        emp_start_date: body.emp_start_date,
        emp_end_date: body.emp_end_date,
        employment_status: body.employment_status,
        phone_no: body.phone_no,
        address: body.address,
        role_id: constants.ROLES.EMPLOYEE,
        status: body.status,
        updated_at: new Date(),
      },
      (where = {
        id: body.employee_id,
      })
    );

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "User updated successfully",
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

const deleteEmployee = async (req, res) => {
  try {
    const body = req.body;
    const employee = await User.findOne({
      where: {
        id: body.employee_id,
      },
    });
    if (!employee) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "User not found",
      });
    }
    await employee.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "User deleted successfully",
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
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
