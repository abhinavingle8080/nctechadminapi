const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");
const Sequelize = require("sequelize");
const constants = require("../../config/constants");

const dashboard = async (req, res) => {
  const userId = req.user?.user_id;
  const today = moment().startOf("day");
  const todayMonthDay = moment().format('MM-DD');
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    res.status(200).json({
      statusCode: 200,
      message: "Dashboard data fetched successfully",
      data: null,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
      success: false,
    });
  }
};

module.exports = {
  dashboard,
};
