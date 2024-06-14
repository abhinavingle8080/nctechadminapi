const { Course } = require('../../models');
const constants = require('../../config/constants');

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Courses retrieved successfully',
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.body;
    const course = await Course.findByPk(id);
    if (course) {
      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: 'Course retrieved successfully',
        data: course
      });
    } else {
      res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Course not found'
      });
    }
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const [updated] = await Course.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedCourse = await Course.findByPk(id);
      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: 'Course updated successfully',
        data: updatedCourse
      });
    } else {
      res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Course not found'
      });
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await Course.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(constants.STATUS_CODES.SUCCESS).json({
        statusCode: constants.STATUS_CODES.SUCCESS,
        message: 'Course deleted successfully'
      });
    } else {
      res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Course not found'
      });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
