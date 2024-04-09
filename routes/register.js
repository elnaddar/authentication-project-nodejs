const express = require("express");
const register = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const utils = require('../utils');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use an environment variable for your database connection string
});

module.exports = register;

register.get('/', (req, res) => {
    if (!req.isAuthenticated())
        utils.renderPage(res, 'pages/register', { title: "Register" });
    else
        res.redirect("/index");
});

register.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username',
            [username, email, hashedPassword]
        );

        // You may want to automatically log in the user here
        // For now, redirect to the login page
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.redirect('/register'); // Redirect back to the registration page on error
    }
});