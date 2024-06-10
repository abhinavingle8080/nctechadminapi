// routes/auth.router.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const CommonController = require('../controllers/superadmin/common.controller');

router.post('/get-designations', CommonController.getDesignations);

module.exports = router;