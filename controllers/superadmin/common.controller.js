const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Role, Designation } = require("../../models");
const Sequelize = require("sequelize");
const CONFIG = require("../../config/config.json");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];
const helper = require("../../helpers/fileupload.helper");
const constants = require('../../config/constants');

const getDesignations = async (req, res) => {
    try {
        const designations = await Designation.findAndCountAll({
            attributes: ["id", "title"],
            offset: (parseInt(req.body.page) - 1) * parseInt(req.body.limit),
            limit: parseInt(req.body.limit),
            order: [['id', 'ASC']],
        });
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: "Designations fetched successfully",
            data: designations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getDesignations
}