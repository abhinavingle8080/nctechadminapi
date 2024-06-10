const jwt = require("jsonwebtoken");
const { User, Employee, Holiday, Leave } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");
const Sequelize = require("sequelize");
const constants = require("../../config/constants");

const dashboard = async (req, res) => {
  const userId = req.user?.user_id;
  const today = moment().startOf("day");
  const todayMonthDay = moment().format('MM-DD');
  try {
    const EmployeeCount = await User.count({
      where: {
        role_id: 2,
      },
    });

    const pendingLeaveCount = await Leave.count({
      where: {
        status: "Pending",
        employee_id: {
          [Op.in]: Sequelize.literal(`(SELECT id FROM users WHERE role_id = ${constants.ROLES.EMPLOYEE} AND deleted_at IS NULL)`),
        },
      },
    });
    
    

    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const thisMonthHolidayCount = await Holiday.findAndCountAll({
      where: {
        date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
    });

    const isTodayHoliday = await Holiday.count({
      where: {
        date: {
          [Op.eq]: currentDate.toISOString().split("T")[0],
        },
      },
    });

    const recentBirthdays = await User.findAndCountAll({
      attributes: ["id", "first_name", "last_name", "date_of_birth"],
      where: {
        role_id: 2,
        [Op.and]: [
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date_of_birth')), moment().month() + 1),
          Sequelize.where(Sequelize.fn('DAY', Sequelize.col('date_of_birth')), moment().date())
        ]
      },
    });

    const usersWithAge = recentBirthdays.rows.map((user) => {
      const userWithAge = { ...user.dataValues }; // Create a shallow copy of the dataValues object
    
      if (typeof user.dataValues.date_of_birth === 'string') {
        userWithAge.date_of_birth = moment(user.dataValues.date_of_birth, 'YYYY-MM-DD').toDate();
      }
    
      userWithAge.age = moment().diff(moment(userWithAge.date_of_birth), 'years');
    
      return userWithAge;
    });

    res.status(200).json({
      statusCode: 200,
      message: "Dashboard data fetched successfully",
      data: {
        EmployeeCount: EmployeeCount,
        pendingLeaveCount: pendingLeaveCount,
        thisMonthHolidayCount: thisMonthHolidayCount,
        isTodayHoliday: isTodayHoliday ? true : false,
        recentBirthdays: usersWithAge,
      },
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
