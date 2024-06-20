const { Course } = require('../../models');
const constants = require('../../config/constants');

const createCourse = async (req, res) => {
  console.log('testing.....', req?.user?.id)
  try {
    // Extract course data from request body
    const {
      course_name,
      description,
      fees,
      discount_fees,
      duration,
      start_date,
      end_date,
      location,
      max_capacity,
      current_capacity,
      // Assuming you get created_by from your authentication system
      // Assuming you get updated_by from your authentication system
    } = req.body;

    // Create the course in the database
    const course = await Course.create({
      course_name,
      description,
      fees,
      discount_fees,
      duration,
      start_date,
      end_date,
      location,
      max_capacity,
      current_capacity,
      created_by : req?.user?.id,
      updated_by :req?.user?.id,// Include updated_by value
    });

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    // console.error('Error creating course:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const body = req.body;
    const courses = await Course.findAndCountAll({
      offset: (parseInt(body.page) - 1) * parseInt(body.limit),
      limit: parseInt(body.limit),
      order: [["id", "ASC"]],
      attributes : [
        "id",
        "status",
        "type",
        "course_name",
        "description",
        "fees",
        "discount_fees",
        "duration",
        "start_date",
        "end_date",
      ]
    });
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
    const { course_id } = req.body;
    const course = await Course.findOne({
      where :{
        id :course_id
      }
    });
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
    const { course_id, ...updates } = req.body;

    if (!course_id) {
      return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
        statusCode: constants.STATUS_CODES.BAD_REQUEST,
        message: 'Course ID is required',
      });
    }

    // Fetch the course to update
    let course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Course not found',
      });
    }

    // Log current course details for debugging
    console.log('Current Course Details:', course.toJSON());

    // Perform updates on the course object
    await course.update({
      ...updates, // Update all fields based on req.body
      updated_at: new Date(), // Ensure updated_at is updated
    });

    // Log updated course details for debugging
    console.log('Updated Course Details:', course.toJSON());

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Course updated successfully',
      data: course, // Optionally return the updated course data
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


const deleteCourse = async (req, res) => {
  try {
    const { course_id } = req.body;

    if (!course_id) {
      return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
        statusCode: constants.STATUS_CODES.BAD_REQUEST,
        message: 'Course ID is required',
      });
    }

    const course = await Course.findByPk(course_id);

    if (!course) {
      return res.status(constants.STATUS_CODES.NOT_FOUND).json({
        statusCode: constants.STATUS_CODES.NOT_FOUND,
        message: 'Course not found',
      });
    }

    await course.destroy();

    res.status(constants.STATUS_CODES.SUCCESS).json({
      statusCode: constants.STATUS_CODES.SUCCESS,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: error.message,
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
