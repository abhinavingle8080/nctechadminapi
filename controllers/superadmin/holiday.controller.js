// const { get } = require("../../routes/holiday.router");

const { Holiday } = require('../../models');
const constants = require('../../config/constants');
const { Op } = require("sequelize");


const getAllHolidays = async (req, res) => {
    try {
        const body = req.body;
        const holidays = await Holiday.findAndCountAll({
            attributes: [
                "id",
                "name",
                "date",
                "description"
            ],
            offset: (parseInt(body.page) - 1) * parseInt(body.limit),
            limit: parseInt(body.limit),
            order: [['id', 'ASC']],
            where: {
                [Op.or]: [
                  {
                    name: {
                      [Op.like]: `%${body.search}%`,
                    },
                  },
                  {
                    date: {
                      [Op.like]: `%${body.search}%`,
                    },
                  },
                ],
              },
        });
          
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holidays retrieved successfully',
            data: holidays,
            success : true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message, // Include error message for debugging
            success : false
        });
    }
};

const createHoliday = async (req, res) => {
    try {
        const body = req.body;
        const isHolidayExists = await Holiday.findOne({
            where: {
                name: body.name,
            }
        });
        if (isHolidayExists) {
            return res.status(constants.STATUS_CODES.VALIDATION).json({
                statusCode: constants.STATUS_CODES.VALIDATION,
                message: 'Holiday with this name already exists',
                success : false
            });
        }
        const newHoliday = await Holiday.create({
            name: body.name,
            date: body.date,
            description: body.description,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday created successfully',
            data: newHoliday,
            success : true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message, // Include error message for debugging
            success : false
        });
    }
};

const getHoliday = async (req, res) => {
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            attributes: [
                "id",
                "name",
                "date",
                "description"
            ],
            where: {
                id: body.holiday_id,
            }
        });
        if (!holiday) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Holiday not found',
                success : false
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday retrieved successfully',
            data: holiday,
            success : true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message, // Include error message for debugging
            success : false
        });
    }
};

const updateHoliday = async (req, res) => {                  //change
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            where: {
                id: body.holiday_id,  
            }
        });
        if (!holiday) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Holiday not found',
                success : false
            });
        }
        await holiday.update({
            name: body.name,
            date: body.date,
            description: body.description,
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday updated successfully',
            success : true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message, // Include error message for debugging
            success : false
        });
    }
};

const deleteHoliday = async (req, res) => {
    try {
        const body = req.body;
        const holiday = await Holiday.findOne({
            where: {
                id: body.holiday_id,
            },
        });
        if (!holiday) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Holiday not found',
                success : false
            });
        }
        await holiday.destroy();

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holiday deleted successfully',
            success : true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message, // Include error message for debugging
            success : false
        });
    }
};

const getHolidaysNoPagination = async (req, res) => {
    try {
        const body = req.body;
        const holidays = await Holiday.findAndCountAll({
            attributes: [
                "id",
                "name",
                "date",
            ],
            order: [['id', 'ASC']],
        });
          
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Holidays retrieved successfully',
            data: holidays,
            success : true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message, 
            success : false
        });
    }
};

module.exports = {
    getAllHolidays,
    createHoliday,
    getHoliday,
    updateHoliday,
    deleteHoliday,
    getHolidaysNoPagination
};
