// routes/auth.router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AuthController = require('../controllers/superadmin/auth.controller');
const passport = require('passport');
const superadminMiddleware = require('../middleware/superadmin.middleware');
const holidayController = require('../controllers/superadmin/holiday.controller');
const EmployeeController = require('../controllers/superadmin/employee.controller');
const leaveController = require('../controllers/employee/leave.controller');
const dashboardController = require('../controllers/employee/dashboard.controller');
const profileController = require('../controllers/superadmin/profile.controller');
const noticeController = require('../controllers/employee/notice.controller');


router.post('/login', AuthController.login);
router.post('/change-password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);
router.post('/get-profile-detail', passport.authenticate('jwt', { session: false }), profileController.getProfileDetails);
router.post('/update-profile-details', passport.authenticate('jwt', { session: false }), profileController.updateProfileDetails);
router.post('/get-dashboard', passport.authenticate('jwt', { session: false }), dashboardController.dashboard);

router.post('/get-leaves', passport.authenticate('jwt', { session: false }), leaveController.getAllLeaves);
router.post('/get-leave', passport.authenticate('jwt', { session: false }), leaveController.getLeave);
router.post('/create-leave', passport.authenticate('jwt', { session: false }), leaveController.createLeave);
router.post('/update-leave', passport.authenticate('jwt', { session: false }), leaveController.updateLeave);
router.post('/delete-leave', passport.authenticate('jwt', { session: false }), leaveController.deleteLeave);


router.post('/get-notices', passport.authenticate('jwt', { session: false }), noticeController.getAllNotices);
router.post('/get-notice', passport.authenticate('jwt', { session: false }), noticeController.getNotice);
// router.post('/create-notice', passport.authenticate('jwt', { session: false }), noticeController.createNotice);
// router.post('/update-notice', passport.authenticate('jwt', { session: false }), noticeController.updateNotice);
// router.post('/delete-notice', passport.authenticate('jwt', { session: false }), noticeController.deleteNotice);

module.exports = router;