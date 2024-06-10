// routes/auth.router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AuthController = require('../controllers/superadmin/auth.controller');
const passport = require('passport');
const dashboardController = require('../controllers/superadmin/dashboard.controller');
const profileController = require('../controllers/superadmin/profile.controller');


router.post('/login', AuthController.login);
router.post('/change-password', passport.authenticate('jwt', { session: false }), AuthController.changePassword);
router.post('/get-profile-detail', passport.authenticate('jwt', { session: false }), profileController.getProfileDetails);
router.post('/update-profile-details', passport.authenticate('jwt', { session: false }), profileController.updateProfileDetails);
router.post('/get-dashboard', passport.authenticate('jwt', { session: false }), dashboardController.dashboard);

module.exports = router;