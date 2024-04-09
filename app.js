// Configure dotenv at the very top
require('dotenv').config();

// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL client setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Utilize the DATABASE_URL from your .env file
});

// Passport configuration
// Assuming you have a separate config file for Passport
require('./config/passport')(passport);

// Middlewares
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(session({
    secret: process.env.SESSION_SECRET, // Use SESSION_SECRET from your .env file
    resave: false,
    secure: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use("/", require("./routes/api"));

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
