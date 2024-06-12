// const { get } = require("../../routes/designation.router");

const { Designation } = require('../../models');
const constants = require('../../config/constants');
const { Op } = require("sequelize");

const getAllDesignations = async (req, res) => {
try {
        const body = req.body;
        const designations = await Designation.findAndCountAll({
            attributes: [
                "id",
                "title",
                "status"
            ],
            offset: (parseInt(body.page) - 1) * parseInt(body.limit),
            limit: parseInt(body.limit),
            order: [['id', 'ASC']],
            where: {
                [Op.or]: [
                  {
                    title: {
                      [Op.like]: `%${body.search}%`,
                    },
                  },
                  {
                    status: {
                      [Op.like]: `%${body.search}%`,
                    },
                  },
                ],
              },
        });
          
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Designations retrieved successfully',
            data: designations,
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

const createDesignation = async (req, res) => {
    try {
        const body = req.body;
        const isDesignationExists = await Designation.findOne({
            where: {
                title: body.title,
            }
        });
        if (isDesignationExists) {
            return res.status(constants.STATUS_CODES.VALIDATION).json({
                statusCode: constants.STATUS_CODES.VALIDATION,
                message: 'Designation with this title already exists',
                success : false
            });
        }
        const newDesignation = await Designation.create({
            title: body.title,
            status: body.status,
            created_at: new Date(),
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Designation created successfully',
            data: newDesignation,
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

const getDesignation = async (req, res) => {
    try {
        const body = req.body;
        const designation = await Designation.findOne({
            attributes: [
                "id",
                "title",
                "status"
            ],
            where: {
                id: body.designation_id,
            }
        });
        if (!designation) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Designation not found',
                success : false
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Designation retrieved successfully',
            data: designation,
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

const updateDesignation = async (req, res) => {
    try {
        const body = req.body;
        const designation = await Designation.findOne({
            where: {
                id: body.designationId,  
            }
        });
        if (!designation) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Designation not found',
                success : false
            });
        }
        await designation.update({
            title: body.title,
            status: body.status,
            updated_at: new Date(),
        });

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Designation updated successfully',
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

const deleteDesignation = async (req, res) => {
    try {
        const body = req.body;
        const designation = await Designation.findOne({
            where: {
                id: body.designation_id,
            },
        });
        if (!designation) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Designation not found',
                success : false
            });
        }
        await designation.destroy();

        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Designation deleted successfully',
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

module.exports = {
    getAllDesignations,
    createDesignation,
    getDesignation,
    updateDesignation,
    deleteDesignation,
};
