require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const superAdminRouter = require('./routes/superadmin.router');
const fileupload = require('express-fileupload');
// const employeeRouter = require('./routes/employee.router');
const { authenticateToken } = require('./middleware/authentication');
const { sequelize } = require('./models');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8024; 

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
  res.json({ message: "Welcome to NCTech Admin API application." });
});

// Routes
app.use('/api/superadmin', superAdminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
