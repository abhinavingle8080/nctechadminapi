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

const userPhoneExistValidation = [
  body("country_phone_code")
    .not()
    .isEmpty()
    .withMessage("Country phone code is required")
    .trim(),
  body("phone_no")
    .not()
    .isEmpty()
    .withMessage("phone number is required")
    .trim(),
];

const createDeviceTokenValidation = [
  body("fcm_token").not().isEmpty().withMessage("Fcm token is required").trim(),
];

const logoutValidation = [
  body("fcm_token").not().isEmpty().withMessage("Fcm token is required").trim(),
];
const updatePasswordValidation = [
  body("current_password")
    .not()
    .isEmpty()
    .withMessage("Current password is required")
    .trim(),
  body("new_password")
    .not()
    .isEmpty()
    .withMessage("New password is required")
    .trim(),
  body("confirm_password")
    .not()
    .isEmpty()
    .withMessage("Confirm password is required")
    .trim(),
];

const signUpValidation = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  body("login_type")
    .not()
    .isEmpty()
    .withMessage("Login type is required")
    .trim(),
  body("role").not().isEmpty().withMessage("Role is required").trim(),
];

const signInValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    // .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  // body('password')
  //     .not()
  //     .isEmpty()
  //     .withMessage('Password is required')
  //     .trim()
  body("login_type")
    .not()
    .isEmpty()
    .withMessage("Login type is required")
    .trim(),
];

const studentSignInValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  body("username").not().isEmpty().withMessage("Username is required").trim(),
];

// Common
const dataLimitValidation = [
  body("limit").not().isEmpty().withMessage("Limit is required").trim(),
];
const PageHandlerValidation = [
  body("page").not().isEmpty().withMessage("Page is required").trim(),
  body("limit").not().isEmpty().withMessage("Limit is required").trim(),
];

// Student
const createStudentValidation = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
  // body('email')
  //     .not()
  //     .isEmpty()
  //     .withMessage('Email address is required')
  //     .isEmail()
  //     .withMessage('Please enter a valid email address')
  //     .trim(),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("Gender id address is required")
    .trim(),
  body("grade_id")
    .not()
    .isEmpty()
    .withMessage("Grade id address is required")
    .trim(),
];
const updateStudentValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("Gender id address is required")
    .trim(),
  body("grade_id")
    .not()
    .isEmpty()
    .withMessage("Grade id address is required")
    .trim(),
];
const deleteStudentValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
];

const getSwitchStudentsValidation = [
  body("current_user_id")
    .not()
    .isEmpty()
    .withMessage("Current user id is required")
    .trim(),
];

// Assignment Question Answer
const getExerciseValidation = [
  body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
];

const submitQuestionAnswerValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
  body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
  body("question_id")
    .not()
    .isEmpty()
    .withMessage("Question id is required")
    .trim(),
];
const submitQuestionAnswersValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
  body("exercise_id")
    .not()
    .isEmpty()
    .withMessage("Exercise id is required")
    .trim(),
];

const checkOTPValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  body("otp").not().isEmpty().withMessage("OTP is required").trim(),
];
const resetPasswordValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  body("otp").not().isEmpty().withMessage("OTP is required").trim(),
  body("password").not().isEmpty().withMessage("Password is required").trim(),
];

const changePasswordValidation = [
  body("old_password")
    .not()
    .isEmpty()
    .withMessage("Old password is required")
    .trim(),
  body("new_password")
    .not()
    .isEmpty()
    .withMessage("New password is required")
    .trim(),
  body("confirm_password")
    .not()
    .isEmpty()
    .withMessage("Confirm password is required")
    .trim(),
];

const updateSignInValidation = [
  body("student_id").not().isEmpty().withMessage("Student is required").trim(),
  body("username").not().isEmpty().withMessage("Username is required").trim(),
  body("password").not().isEmpty().withMessage("Password is required").trim(),
];

const sendOTPValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
];

const getDiscountCouponsValidation = [
  body("student_id").not().isEmpty().withMessage("Student id is required").trim(),
];

const applyDiscountCouponValidation = [
  // body("student_id").not().isEmpty().withMessage("Student id is required").trim(),
  body("coupon_code").not().isEmpty().withMessage("Coupon code is required").trim(),
];

const createOrderValidation = [
  body("student_id").not().isEmpty().withMessage("Student is required").trim(),
  body("item_type").not().isEmpty().withMessage("Item type is required").trim(),
  body("item_id").not().isEmpty().withMessage("Item id is required").trim(),
  body("total_amount")
    .not()
    .isEmpty()
    .withMessage("Total amount is required")
    .trim(),
];

const updateOrderValidation = [
  body("order_id").not().isEmpty().withMessage("Order id is required").trim(),
  body("transaction_id")
    .not()
    .isEmpty()
    .withMessage("Transaction id is required")
    .trim(),
  body("item_type").not().isEmpty().withMessage("Item type is required").trim(),
  body("item_id").not().isEmpty().withMessage("Item id is required").trim(),
  body("quantity").not().isEmpty().withMessage("Quantity is required").trim(),
  body("status").not().isEmpty().withMessage("Status is required").trim(),
];

const failedOrderValidation = [
  body("order_id").not().isEmpty().withMessage("Order id is required").trim(),
  body("transaction_id")
    .not()
    .isEmpty()
    .withMessage("Transaction id is required")
    .trim(),
  body("status").not().isEmpty().withMessage("Status is required").trim(),
];

const getSuscriptionDurationsValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
];

const getSuscriptionsValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
  body("duration").not().isEmpty().withMessage("Duration is required").trim(),
];
const getSuscriptionValidation = [
  body("subscription_id")
    .not()
    .isEmpty()
    .withMessage("Subscription id is required")
    .trim(),
];

const cancleSuscriptionValidation = [
  body("subscription_id")
    .not()
    .isEmpty()
    .withMessage("User subscription id is required")
    .trim(),
];

const getUserAddressValidation = [
  body("address_id")
    .not()
    .isEmpty()
    .withMessage("Address id is required")
    .trim(),
];
const getUserAddressByTypeValidation = [
  body("type").not().isEmpty().withMessage("Type is required").trim(),
];

const createInquiryValidation = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  body("message").not().isEmpty().withMessage("Message is required").trim(),
];

const updateInquiryValidation = [
  body("inquiry_id")
    .not()
    .isEmpty()
    .withMessage("Inquiry id is required")
    .trim(),
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .trim(),
  body("message").not().isEmpty().withMessage("Message is required").trim(),
];

const deleteInquiryValidation = [
  body("inquiry_id")
    .not()
    .isEmpty()
    .withMessage("Inquiry id is required")
    .trim(),
];

const getProgressReportValidation = [
  body("student_id")
    .not()
    .isEmpty()
    .withMessage("Student id is required")
    .trim(),
  body("grade_id")
    .not()
    .isEmpty()
    .withMessage("Grade id is required")
    .trim(),
  // body("start_date")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Start date is required")
  //   .trim(),
  // body("end_date").not().isEmpty().withMessage("End date is required").trim(),
];

const createSupportTicketValidation = [
  body("title").not().isEmpty().withMessage("Subject is required").trim(),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .trim(),
];

const updateProfileDatailValidation = [
  body("first_name")
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .trim(),
  body("last_name").not().isEmpty().withMessage("Last Name is required").trim(),
];

const getVideoValidation = [
  body("video_id").not().isEmpty().withMessage("Video id is required").trim(),
];

const getExerciseByGradeValidation = [
  body("grade_id").not().isEmpty().withMessage("Grade id is required").trim(),
];

const createUserAddressValidation = [
  body("address_line_1")
    .not()
    .isEmpty()
    .withMessage("Address line 1 is required")
    .trim(),
  body("type").not().isEmpty().withMessage("Type is required").trim(),
  body("city_id").not().isEmpty().withMessage("City id is required").trim(),
  body("zip_code").not().isEmpty().withMessage("Zip code is required").trim(),
];

const getPaymentHistoryValidation = [
  body("transaction_id")
    .not()
    .isEmpty()
    .withMessage("Transaction id is required")
    .trim(),
];

const updateNotificationValidation = [
  // body("notification_id")
  //   .not()
  //   .isEmpty()
  //   .withMessage("Notification id is required")
  //   .trim(),
];

const createRzpCustomerSubscription = [
  body("plan_id").not().isEmpty().withMessage("Plan id is required").trim(),
  body("customer_id")
    .not()
    .isEmpty()
    .withMessage("Customer id is required")
    .trim(),
  body("total_count")
    .not()
    .isEmpty()
    .withMessage("Total count id is required")
    .trim(),
];

const createStrpeCustomerSession = [
  body("stripe_plan_id")
    .not()
    .isEmpty()
    .withMessage("Plan id is required")
    .trim(),
  body("order_id")
    .not()
    .isEmpty()
    .withMessage("Order id is required")
    .trim(),
  body("item_type")
    .not()
    .isEmpty()
    .withMessage("Item type is required")
    .trim(),
  body("item_id")
    .not()
    .isEmpty()
    .withMessage("Item id is required")
    .trim(),
];

const retrieveStripeSession = [
  body('session_id')
    .not()
    .isEmpty()
    .withMessage('Session id is required')
    .trim(),
];

const createStrpeCustomerSubscription = [
  body("plan_id").not().isEmpty().withMessage("Plan id is required").trim(),
  body("customer_id")
    .not()
    .isEmpty()
    .withMessage("Customer id is required")
    .trim(),
];

const getUserTaskDetailsValidation = [
  body("user_task_id")
    .not()
    .isEmpty()
    .withMessage("User Task id is required")
    .trim(),
  body('student_id')
  .not()
  .isEmpty()
  .withMessage("Student id is required")
  .trim(),
];

module.exports = {
  // Authentication
  userExistValidation,
  userPhoneExistValidation,
  signInValidation,
  studentSignInValidation,
  signUpValidation,
  createDeviceTokenValidation,
  updatePasswordValidation,
  changePasswordValidation,
  logoutValidation,

  // Profile
  updateProfileDatailValidation,

  // Forgot Password
  sendOTPValidation,
  checkOTPValidation,
  resetPasswordValidation,

  // Common
  dataLimitValidation,
  PageHandlerValidation,

  // Student
  createStudentValidation,
  updateStudentValidation,
  deleteStudentValidation,
  getSwitchStudentsValidation,
  updateSignInValidation,

  // Assignment Question Answer
  getExerciseValidation,
  submitQuestionAnswersValidation,
  submitQuestionAnswerValidation,

  // Discount
  getDiscountCouponsValidation,
  applyDiscountCouponValidation,

  // Order
  createOrderValidation,
  updateOrderValidation,
  failedOrderValidation,

  // Subscription
  getSuscriptionDurationsValidation,
  getSuscriptionsValidation,
  getSuscriptionValidation,
  cancleSuscriptionValidation,

  // User Address
  getUserAddressValidation,
  getUserAddressByTypeValidation,
  createUserAddressValidation,

  // Inquriy
  createInquiryValidation,
  updateInquiryValidation,
  deleteInquiryValidation,

  // Progress Report
  getProgressReportValidation,

  // Support
  createSupportTicketValidation,

  // Video
  getVideoValidation,

  // Exercise
  getExerciseByGradeValidation,

  // Transaction
  getPaymentHistoryValidation,

  // Notification
  updateNotificationValidation,

  createRzpCustomerSubscription,
  createStrpeCustomerSession,
  createStrpeCustomerSubscription,
  retrieveStripeSession,

  // User Task 
  getUserTaskDetailsValidation,
};