const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Role } = require("../../models");
const Sequelize = require("sequelize");
const CONFIG = require("../../config/config.json");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];
const helper = require("../../helpers/fileupload.helper");
const constants = require('../../config/constants');

const getProfileDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "first_name", "last_name", "email", "role_id", [Sequelize.fn("concat", `${config.IMAGE_PATH}/`, Sequelize.col("profile_image")), "profile_image"]],
      include : [
        {
          model: Role,
          as: "Role",
          attributes: ["id", "role", "label"],
        }
      ],
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Profile Fetched successfully',
      data : user
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfileDetails = async (req, res) => {
  try {
    const body = req.body;
    const files = req.files;
    const baseFileUploadPath = `storage/images/users`;
    let relativePath = null;
    if (files && files?.profile_image) {
      const fileName = files?.profile_image?.name;
      relativePath = "users/" + fileName;
      const fileUpload = await helper.fileUpload(fileName, files?.profile_image, baseFileUploadPath);
    }

    const existingUser = await User.findOne({
      where: {
        id: req.user.id,
      },
    })

    const isUpdated = await User.update(
      {
        first_name: body.first_name,
        last_name: body.last_name,
        profile_image: relativePath ? relativePath : existingUser.profile_image,
        email: body.email,
        country_code: body.country_code,
        phone_no: body.phone_no,
        gender: body.gender,
        date_of_birth: body.date_of_birth,
        updated_at: new Date(),
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    if (!isUpdated) {
      return res.status(404).json({ message: "Profile not found" });
    } else {
      return res.status(200).json({ message: "Profile updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getProfileDetails,
  updateProfileDetails,
};
