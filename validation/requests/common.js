const { body, query, check, param } = require('express-validator');

const updateApprovalRequest = [
    body('first_name')
        .not()
        .isEmpty()
        .withMessage('First Name is required')
        .trim(),
    body('last_name')
        .not()
        .isEmpty()
        .withMessage('Last Name is required')
        .trim(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
    body('organization_name')
        .not()
        .isEmpty()
        .withMessage('Organization name is required')
        .trim(),
    body('country_phone_code')
        .not()
        .isEmpty()
        .withMessage('Country phone code is required')
        .trim(),
    body('phone_no')
        .not()
        .isEmpty()
        .withMessage('Phone number is required')
        .trim(),
    
];

const getApprovalRequest = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .trim(),
];

const assignExercisesToUserValidation = [
    body('student_id')
        .not()
        .isEmpty()
        .withMessage('Student is required')
        .trim(),
    body('start_date')
        .not()
        .isEmpty()
        .withMessage('Start date is required')
        .trim(),
        // .custom((value, { req }) => {
        //     const currentDate = new Date();
        //     const startDate = new Date(value);
        //     if (startDate <= currentDate) {
        //         throw new Error('Start date must be greater than the current date');
        //     }
        //     req.startDate = startDate;
        //     return true;
        // }),
    body('end_date')
        .not()
        .isEmpty()
        .withMessage('End date is required')
        .trim(),
        // .custom((value, { req }) => {
        //     const endDate = new Date(value);
        //     const startDate = req.startDate;
        //     if (!startDate) {
        //         throw new Error('Start date is missing or invalid');
        //     }
        //     if (endDate <= startDate) {
        //         throw new Error('End date must be greater than the start date');
        //     }
        //     return true;
        // })
];

const pageHandlerValidation = [
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
];

const statesValidation = [
    body('country_id')
        .not()
        .isEmpty()
        .withMessage('Country is required')
        .trim(),
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
];

const citiesValidation = [
    body('state_id')
        .not()
        .isEmpty()
        .withMessage('State is required')
        .trim(),
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
];

const getAssignedExercisesValidation = [
    body('student_id')
    .not()
    .isEmpty()
    .withMessage('Student is required')
    .trim(),
]


module.exports = {
    updateApprovalRequest,
    getApprovalRequest,
    pageHandlerValidation,
    statesValidation,
    citiesValidation,

    assignExercisesToUserValidation,
    getAssignedExercisesValidation,

}