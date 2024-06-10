const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Role } = require("../../models");
const CONFIG = require("../../config/config.json");
const bcryptjs = require("bcryptjs");
const app = require("../../services/app.service");
const config = require("../../config/app.json")[app["env"]];
const helper = require("../../helpers/fileupload.helper");
const constants = require('../../config/constants');
const Sequelize = require("sequelize");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Please check your email and try again.",
      });
    }
    

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
      });
    }

    // Check user role
    if (user.role_id !== 1 && user.role_id !== 2) {
      return res.status(403).json({
        message: "Unauthorized access. Invalid role.",
      });
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email, role_id: user.role_id }, // Including role_id in the token payload
      CONFIG.app_secret_key,
      { expiresIn: "365d" }
    );

    const userData = await User.findOne({
      attributes: ["id", "email", "first_name", "last_name", "role_id", [Sequelize.fn("concat", `${config.IMAGE_PATH}/`, Sequelize.col("profile_image")), "profile_image"]],
      include: [
        {
          model: Role,
          as: "Role",
          attributes: ["id", "role", "label"],
        },
      ],
      where: {
        email: email,
      },
    });

    res.status(200).json({
      message: "Login successful",
      user: userData,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const changePassword = async function (req, res) {
  try {
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;
    const confirmPassword = req.body.confirm_password;

    const checkUser = await User.findOne({
      where: {
        id: req.body.userID,
      },
    });

    if (!checkUser) {
      return res.status(422).json({
        message: "User does not exist",
      });
    }

    const result = await bcryptjs.compare(oldPassword, checkUser.password);
    if (!result) {
      return res.status(422).json({
        message: "Invalid Password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(422).json({
        message: "New password and confirm password do not match.",
      });
    }

    const saltRounds = 10;
    await User.update(
      {
        password: bcrypt.hashSync(newPassword, saltRounds),
      },
      {
        where: {
          id: req.body.userID,
        },
      }
    );

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports = {
  login,
  changePassword,
};
