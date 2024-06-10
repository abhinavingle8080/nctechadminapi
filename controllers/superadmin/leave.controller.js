const { Leave, LeaveDay, User } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");

const getAllLeaves = async (req, res) => {
  try {
    // const userId = req.user.id;
    const body = req.body;
    let whereCondition = {};

    if (body.status) {
      whereCondition.status = body.status; 
    }

    const leaves = await Leave.findAndCountAll({
      attributes: ["id", "start_date", "end_date", "reason", "status", "remark", "duration", "created_at"],
      include: [
        { model: User, attributes: ["id", "first_name", "last_name", "email"], as: "Employee", required: true },
        { model: LeaveDay, attributes: ["id", "date", "duration", "is_holiday"], as: "LeaveDays", required: true },
      ],
      where: whereCondition, 
      offset: (parseInt(body.page) - 1) * parseInt(body.limit),
      limit: parseInt(body.limit),
      order: [["id", "ASC"]],
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Leaves retrieved successfully",
      data: leaves,
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


const createLeave = async (req, res) => {
  try {
    const body = req.body;
    // Check if leave already exists for the same date, day, duration, and reason
    // const isLeaveExists = await Leave.findOne({
    //   where: {
    //     date: body.date,
    //     day: body.day,
    //     duration: body.duration,
    //     reason: body.reason,
    //   },
    // });
    // if (isLeaveExists) {
    //   return res.status(constants.STATUS_CODES.VALIDATION).json({
    //     statusCode: constants.STATUS_CODES.VALIDATION,
    //     message: "Leave with this date, day, duration, and reason already exists",
    //   });
    // }

    let leaveDuration = 0;
    const durationCount = body?.leaveDays?.reduce((acc, day) => {
        day?.selectedOption === "FullDay" ? leaveDuration++ : leaveDuration += 0.5
    });
    //  new leave bnvalii
    const newLeave = await Leave.create({
      employee_id : body.employee_id || req.user.id || 1,
      start_date: body.start_date,
      end_date: body.end_date,
      remark: body.remark,
      reason: body.reason,
      duration: leaveDuration,
      status: "Pending",
      created_at: new Date(),
      updated_at: new Date(),
    });

    const leaveDays = await Promise.all(body?.leaveDays?.map(async (day) => {
      return LeaveDay.create({
          leave_id: newLeave.id,
          date: day.date,
          duration: day.selectedOption,
          is_holiday: day.is_holiday,
      });
  }));

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Leave created successfully",
      data: newLeave,
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

const getLeave = async (req, res) => {
  try {
    const body = req.body;
    const leave = await Leave.findOne({
      attributes: ["id", "start_date", "end_date", "reason", "status", "remark", "created_at"],
      include: [
        { model: User, attributes: ["id", "first_name", "last_name", "email"], as: "Employee", required: true },
        { model: LeaveDay, attributes: ["id", "date", "duration", "is_holiday"], as: "LeaveDays", required: true },
      ],
      where: {
        id: body.leave_id,
      },
    });
    if (!leave) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Leave not found",
      });
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Leave retrieved successfully",
      data: leave,
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

const updateLeave = async (req, res) => {
  try {
    const body = req.body;
    const leave = await Leave.findOne({
      where: {
        id: body.leave_id,
      },
    });
    if (!leave) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Leave not found",
      });
    }
    await leave.update({
      date: body.date,
      day: body.day,
      duration: body.duration,
      remark: body.remark,
      reason: body.reason,
      status: body.status,
      updated_at: new Date(),
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Leave updated successfully",
      data: leave,
    });
  } catch (error) {
    console.error(error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: error.message, // Include error message for debugging
    });
  }
};

const deleteLeave = async (req, res) => {
  try {
    const body = req.body;
    const leave = await Leave.findOne({
      where: {
        id: body.leave_id,
      },
    });
    if (!leave) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Leave not found",
      });
    }
    await leave.destroy();
    /* where : {
                id : leave.id,
            }
        });*/

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Leave deleted successfully",
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
  getAllLeaves,
  createLeave,
  getLeave,
  updateLeave,
  deleteLeave,
};
