const { body, query, check, param } = require("express-validator");

const userExistValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
];

const signInValidation = [
  body("username").not().isEmpty().withMessage("Username is required").trim(),
  body("password").not().isEmpty().withMessage("Password is required").trim(),
];

const signInV2Validation = [
  body("email")
    .not()
    .isEmpty().withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address").trim(),
  body("username").not().isEmpty().withMessage("Username is required").trim(),
  body("password").not().isEmpty().withMessage("Password is required").trim(),
];

const PageHandlerValidation = [
  body("page").not().isEmpty().withMessage("Page is required").trim(),
  body("limit").not().isEmpty().withMessage("Limit is required").trim(),
];

const updateProfileDetailValidation = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
  // body("email").not().isEmpty().withMessage("Email address is required").trim(),
];

const getExercisesValidation = [
  // body("status")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Status is required")
  //   .trim(),
];

const getExerciseValidation = [
  body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
];

const getQuestionsValidation = [
  body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
];

const getUserTaskDetailValidation = [
  body("user_task_id")
    .not()
    .isEmpty()
    .withMessage("User task id is required")
    .trim(),
];

const submitUserAnswerValidation = [
  // body("exercise_id")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Exercise id is required")
  //   .trim(),
  body("question_id")
    .not()
    .isEmpty()
    .withMessage("Question id is required")
    .trim(),
];

const submitQuestionAnswersValidation = [
  body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
];

const submitUserTaskStatusValidation = [
  body("user_task_id")
    .not()
    .isEmpty()
    .withMessage("Task id is required")
    .trim(),
];

const updateQuizTimerValidation = [
  body("user_task_id")
    .not()
    .isEmpty()
    .withMessage("Task id is required")
    .trim(),
  body("total_time_spent")
  .not()
  .isEmpty()
  .withMessage("Total time spent is required")
  .trim(),
]

const getUserTaskReportValidation = [
    body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
]

const updateNotificationValidation = [
  body("notification_id")
    .not()
    .isEmpty()
    .withMessage("Notification id is required")
    .trim(),
]

const getLearningTaskValidation = [
  body('user_task_id')
  .not()
  .isEmpty()
  .withMessage('User Task id is required')
  .trim(),
]

const getProgressReportValidation = [
  body("grade_id")
    .not()
    .isEmpty()
    .withMessage("Grade id is required")
    .trim(),
  // body('start_date')
  // .not()
  // .isEmpty()
  // .withMessage('Start date is required')
  // .trim(),
  // body('end_date')
  // .not()
  // .isEmpty()
  // .withMessage('End date is required')
  // .trim(),
]

module.exports = {
  userExistValidation,
  signInValidation,
  signInV2Validation,
  PageHandlerValidation,

  // Profile
  updateProfileDetailValidation,

  // Exercise
  getExercisesValidation,
  getExerciseValidation,
  getQuestionsValidation,
  submitUserAnswerValidation,
  submitUserTaskStatusValidation,
  submitQuestionAnswersValidation,
  updateQuizTimerValidation,
  getUserTaskReportValidation,
  getUserTaskDetailValidation,

  // Notifications
  updateNotificationValidation,

  // Learning
  getLearningTaskValidation,

  // Progress Report
  getProgressReportValidation,

};
