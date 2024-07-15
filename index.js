require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const superAdminRouter = require('./routes/superadmin.router');
const commonRouter = require('./routes/common.router');
const userRouter = require('./routes/user.router');
const fileupload = require('express-fileupload');
const i18n = require('./i18n/config');
const localizationMiddleware = require('./middleware/localization.middleware');
// const employeeRouter = require('./routes/employee.router');
const { authenticateToken } = require('./middleware/authentication');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8020; 

// Localization Configuration
app.use(i18n.init);
app.use(localizationMiddleware);
app.use(fileupload());

app.use(express.json({ limit: '25mb' })); // Limit the response
app.use(bodyParser.json()); // Parse Body In JSON Format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// For Static Data
app.use('/storage', express.static(__dirname + '/storage')); // Serve Static Data
app.use('/language', express.static(__dirname + '/languages')); // Localization Files


// Initialize Passport
app.use(passport.initialize());
// app.use(authenticateToken);

// simple route
app.get("/", (_req, res) => {
  res.json({ message: res.__("message") + ` Server is running on port ${PORT}.` });
});

// Routes
app.use('/api/superadmin', superAdminRouter);
app.use('/api/common', commonRouter);
app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
