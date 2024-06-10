const { Team, TeamMember, User } = require("../../models");
const constants = require("../../config/constants");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];

const getAllTeams = async (req, res) => {
  try {
    const body = req.body;
    let whereCondition = {};

    if (body.status) {
      whereCondition.status = body.status; 
    }

    const teams = await Team.findAndCountAll({
      attributes: ["id", "name", "type", "description"],
      include: [
        {
          model: TeamMember,
          as: "TeamMembers",
          attributes: ["id", "emp_id", "team_id"],
          include: [
            {
              model: User,
              as: "Employee",
              attributes: ["id", "first_name", "last_name", "email"],
              where: {
                role_id: 2,
              },
            }
          ]
        },
      ],
      where: whereCondition, 
      offset: (parseInt(body.page) - 1) * parseInt(body.limit),
      limit: parseInt(body.limit),
      order: [["id", "ASC"]],
    });
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Teams retrieved successfully",
      data: teams,
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

const createTeam = async (req, res) => {
  try {
    const body = req.body;
    const team = await Team.create({
      name: body.name,
      type: body.type,
      description: body.description,
      created_at: new Date(),
      updated_at: new Date(),
      // Add any other relevant fields here
    });  
     if (Array.isArray(body.users)) { // Check if body.users is an array
      const TeamMembers = await Promise.all(
        body.users.map(async (user) => {
          return await TeamMember.create({
            user_id: user.id,
            team_id: team.id,
          });
        })
      );
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Team created successfully",
      data: team,
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

const getTeam = async (req, res) => {
  try {
    const teamId = req.body.teamId;
    const team = await Team.findOne({
        attributes: ["id", "name", "type", "description"],
        include: [
          {
            model: TeamMember,
            as: "TeamMembers",
            attributes: ["id", "emp_id", "team_id"],
            include: [
              {
                model: User,
                as: "Employee",
                attributes: ["id", "first_name", "last_name", "email"],
                where: {
                  role_id: 2,
                },
              }
            ]
          }
        ],
      where: { id:teamId },
      
    });
    if (!team) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Team not found",
      });
    }
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Team retrieved successfully",
      data: team,
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

const updateTeam = async (req, res) => {
  try {
    const teamId = req.body.teamId;
    const body = req.body;
    const team = await Team.findOne({
      where: { id: teamId },
    });
    if (!team) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Team not found",
      });
    }
    await team.update(
      {
        name: body.name,
        type: body.type,
        description: body.description,
        emp_id: body.emp_id,
        teamId: body.teamId,
        updated_at: new Date(),
        // Update other relevant fields here
      },
      { where: { id: teamId } }
    );
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Team updated successfully",
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

const deleteTeam = async (req, res) => {
  try {
    const teamId = req.body.teamId;
    const team = await Team.findOne({
      where: { id: teamId },
    });
    if (!team) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: "Team not found",
      });
    }
    await team.destroy();
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: "Team deleted successfully",
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
  getAllTeams,
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam,
};
