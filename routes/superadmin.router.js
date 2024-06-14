// routes/auth.router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// Controllers
const AuthController = require('../controllers/superadmin/auth.controller');
const holidayController = require('../controllers/superadmin/holiday.controller');
const EmployeeController = require('../controllers/superadmin/employee.controller');
const leaveController = require('../controllers/superadmin/leave.controller');
const dashboardController = require('../controllers/superadmin/dashboard.controller');
const profileController = require('../controllers/superadmin/profile.controller');
const noticeController = require('../controllers/superadmin/notice.controller');
const designationController = require('../controllers/superadmin/designation.controller');
const teamController = require('../controllers/superadmin/team.controller');
const paymentController = require('../controllers/superadmin/payment.controller');
const courseController = require('../controllers/superadmin/course.controller');
const studentController = require('../controllers/superadmin/student.controller')

// Authentication routes
router.post('/login', AuthController.login);
router.post('/change-password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);
router.post('/get-profile-detail', passport.authenticate('jwt', { session: false }), profileController.getProfileDetails);
router.post('/update-profile-details', passport.authenticate('jwt', { session: false }), profileController.updateProfileDetails);
router.post('/get-dashboard', passport.authenticate('jwt', { session: false }), dashboardController.dashboard);

// Employee routes
router.post('/get-employees', passport.authenticate('jwt', { session: false }), EmployeeController.getAllEmployees);
router.post('/create-employee', passport.authenticate('jwt', { session: false }), EmployeeController.createEmployee);
router.post('/get-employee', passport.authenticate('jwt', { session: false }), EmployeeController.getEmployee);
router.post('/update-employee', passport.authenticate('jwt', { session: false }), EmployeeController.updateEmployee);
router.post('/delete-employee', passport.authenticate('jwt', { session: false }), EmployeeController.deleteEmployee);

// Holiday routes
router.post('/get-holidays', passport.authenticate('jwt', { session: false }), holidayController.getAllHolidays);
router.post('/create-holiday', passport.authenticate('jwt', { session: false }), holidayController.createHoliday);
router.post('/get-holiday', passport.authenticate('jwt', { session: false }), holidayController.getHoliday);
router.post('/update-holiday', passport.authenticate('jwt', { session: false }), holidayController.updateHoliday);
router.post('/delete-holiday', passport.authenticate('jwt', { session: false }), holidayController.deleteHoliday);
router.post('/get-holidays-no-pagination', passport.authenticate('jwt', { session: false }), holidayController.getHolidaysNoPagination);

// Leave routes
router.post('/get-leaves', passport.authenticate('jwt', { session: false }), leaveController.getAllLeaves);
router.post('/get-leave', passport.authenticate('jwt', { session: false }), leaveController.getLeave);
router.post('/create-leave', passport.authenticate('jwt', { session: false }), leaveController.createLeave);
router.post('/update-leave', passport.authenticate('jwt', { session: false }), leaveController.updateLeave);
router.post('/delete-leave', passport.authenticate('jwt', { session: false }), leaveController.deleteLeave);

// Designation routes
router.post('/get-designations', passport.authenticate('jwt', { session: false }), designationController.getAllDesignations);
router.post('/create-designation', passport.authenticate('jwt', { session: false }), designationController.createDesignation);
router.post('/get-designation', passport.authenticate('jwt', { session: false }), designationController.getDesignation);
router.post('/update-designation', passport.authenticate('jwt', { session: false }), designationController.updateDesignation);
router.post('/delete-designation', passport.authenticate('jwt', { session: false }), designationController.deleteDesignation);

// Notice routes
router.post('/get-notices', passport.authenticate('jwt', { session: false }), noticeController.getAllNotices);
router.post('/create-notice', passport.authenticate('jwt', { session: false }), noticeController.createNotice);
router.post('/get-notice', passport.authenticate('jwt', { session: false }), noticeController.getNotice);
router.post('/update-notice', passport.authenticate('jwt', { session: false }), noticeController.updateNotice);
router.post('/delete-notice', passport.authenticate('jwt', { session: false }), noticeController.deleteNotice);

// Team routes
router.post('/get-teams', passport.authenticate('jwt', { session: false }), teamController.getAllTeams);
router.post('/create-team', passport.authenticate('jwt', { session: false }), teamController.createTeam);
router.post('/get-team', passport.authenticate('jwt', { session: false }), teamController.getTeam);
router.post('/update-team', passport.authenticate('jwt', { session: false }), teamController.updateTeam);
router.post('/delete-team', passport.authenticate('jwt', { session: false }), teamController.deleteTeam);

// Payment routes
router.post('/get-payments', passport.authenticate('jwt', { session: false }), paymentController.getAllPayments);
router.post('/create-payment', passport.authenticate('jwt', { session: false }), paymentController.createPayment);
router.post('/get-payment', passport.authenticate('jwt', { session: false }), paymentController.getPayment);
router.post('/update-payment', passport.authenticate('jwt', { session: false }), paymentController.updatePayment);
router.post('/delete-payment', passport.authenticate('jwt', { session: false }), paymentController.deletePayment);

// Course routes
router.post('/create-course', passport.authenticate('jwt', { session: false }), courseController.createCourse);
router.post('/get-courses', passport.authenticate('jwt', { session: false }), courseController.getAllCourses);
router.post('/get-course', passport.authenticate('jwt', { session: false }), courseController.getCourseById);
router.post('/update-course', passport.authenticate('jwt', { session: false }), courseController.updateCourse);
router.post('/delete-course', passport.authenticate('jwt', { session: false }), courseController.deleteCourse);

// Student routes
router.post('/get-students', studentController.getAllStudents);
router.post('/create-student', studentController.createStudent);
router.post('/get-student', studentController.getStudent);
router.post('/update-student', studentController.updateStudent);
router.post('/delete-student', studentController.deleteStudent);


module.exports = router;
