const { body, query, check, param } = require('express-validator')
var { Language } = require('../../models');

const PageHandlerValidation = [
    body('page')
        .not()
        .isEmpty()
        .withMessage('Page is required')
        .trim(),
    body('limit')
        .not()
        .isEmpty().
        withMessage('Limit is required')
        .trim()
]

const loginValidation = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
    body('password')
        .not()
        .isEmpty().
        withMessage('Password is required')
        .trim()
]

const forgotPasswordValidation = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim()
]

const resetPasswordValidation = [
    body('password')
        .not()
        .isEmpty().
        withMessage('Password is required')
        .trim()
]

//==============================================================================================
// ROLES VALIDATION
const fetchModulesByRoleIDValidation = [
    body('role_id')
        .not()
        .isEmpty()
        .withMessage('Role id is required')
        .trim(),
]

//==============================================================================================
// STUDENT VALIDATION

const createStudentValidation = [
    body('first_name')
        .not()
        .isEmpty()
        .withMessage('first_name is required')
        .trim(),
    body('last_name')
        .not()
        .isEmpty()
        .withMessage('last_name is required')
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
    body('gender')
        .not()
        .isEmpty()
        .withMessage('gender is required')
        .trim(),
    body('date_of_birth')
        .not()
        .isEmpty()
        .withMessage('date_of_birth is required')
        .trim(),
    body('login_type')
        .not()
        .isEmpty()
        .withMessage('login_type is required')
        .trim(),
    body('password')
        .not()
        .isEmpty().
        withMessage('Password is required')
        .trim()
];

const updateStudentValidation = [
    body('student_id')
        .not()
        .isEmpty()
        .withMessage('student id is required')
        .trim(),
    body('first_name')
        .not()
        .isEmpty()
        .withMessage('first_name is required')
        .trim(),
    body('last_name')
        .not()
        .isEmpty()
        .withMessage('last_name is required')
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
    body('gender')
        .not()
        .isEmpty()
        .withMessage('gender is required')
        .trim(),
    body('date_of_birth')
        .not()
        .isEmpty()
        .withMessage('date_of_birth is required')
        .trim(),
    body('login_type')
        .not()
        .isEmpty()
        .withMessage('login_type is required')
        .trim(),
    body('password')
        .not()
        .isEmpty().
        withMessage('Password is required')
        .trim()
];

const deleteStudentValidation = [
    body('student_id')
        .not()
        .isEmpty()
        .withMessage('Student id is required')
        .trim()
];

//==============================================================================================
// FAQ VALIDATION

const createFaqValidation = [
    body('category_id')
        .not()
        .isEmpty()
        .withMessage('Category id is required')
        .trim(),
    body('question')
        .not()
        .isEmpty()
        .withMessage('Question is required')
        .trim(),
    body('answer')
        .not()
        .isEmpty()
        .withMessage('Answer is required')
        .trim(),
    body('type')
        .not()
        .isEmpty()
        .withMessage('Type is required')
        .trim(),
    body('status')
        .not()
        .isEmpty()
        .withMessage('Status is required')
        .trim(),
];

const updateFaqValidation = [
    body('faq_id')
        .not()
        .isEmpty()
        .withMessage('Faq id is required')
        .trim(),
    body('category_id')
        .not()
        .isEmpty()
        .withMessage('Category id is required')
        .trim(),
    body('question')
        .not()
        .isEmpty()
        .withMessage('Question is required')
        .trim(),
    body('answer')
        .not()
        .isEmpty()
        .withMessage('Answer is required')
        .trim(),
    body('type')
        .not()
        .isEmpty()
        .withMessage('Type is required')
        .trim(),
    body('status')
        .not()
        .isEmpty()
        .withMessage('Status is required')
        .trim(),
];
const deleteFaqValidation = [
    body('faq_id')
        .not()
        .isEmpty()
        .withMessage('Faq id is required')
        .trim()
];

const createVideoValidation = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
        .trim()
];
const updateVideoValidation = [
    body('video_id')
        .not()
        .isEmpty()
        .withMessage('Video id is required')
        .trim(),
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
        .trim()
];
const deleteVideoValidation = [
    body('video_id')
        .not()
        .isEmpty()
        .withMessage('Video id is required')
        .trim()
];

// Employee

const createEmployeeValidation = [
    body('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required')
        .trim(),
    body('last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required')
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
    body('password')
        .not()
        .isEmpty().
        withMessage('Password is required')
        .trim(),
    body('role_id')
        .not()
        .isEmpty()
        .withMessage('Role id is required')
        .trim(),
];

const updateEmployeeValidation = [
    body('employee_id')
        .not()
        .isEmpty()
        .withMessage('Employee id is required')
        .trim(),
    body('first_name')
        .not()
        .isEmpty()
        .withMessage('First name is required')
        .trim(),
    body('last_name')
        .not()
        .isEmpty()
        .withMessage('Last name is required')
        .trim(),
    body('role_id')
        .not()
        .isEmpty()
        .withMessage('Role id is required')
        .trim(),
];

const deleteEmployeeValidation = [
    body('employee_id')
        .not()
        .isEmpty()
        .withMessage('Employee id is required')
        .trim()
];

const getEmployeeValidation = [
    body('employee_id')
        .not()
        .isEmpty()
        .withMessage('Employee id is required')
        .trim()
];

module.exports = {
    PageHandlerValidation,

    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,

    // Role Module
    fetchModulesByRoleIDValidation,

    createStudentValidation,
    updateStudentValidation,
    deleteStudentValidation,

    createFaqValidation,
    updateFaqValidation,
    deleteFaqValidation,

    createVideoValidation,
    updateVideoValidation,
    deleteVideoValidation,

    createEmployeeValidation,
    updateEmployeeValidation,
    deleteEmployeeValidation,
    getEmployeeValidation,
}