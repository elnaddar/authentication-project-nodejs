const express = require("express");
const login = express.Router();
const utils = require('../utils');
const passport = require('passport');
 
module.exports = login;

login.get('/', (req, res) => {
    if (!req.isAuthenticated())
        utils.renderPage(res, 'pages/login', { title: "Login" });
    else
        res.redirect("/index");
});

login.post('/', passport.authenticate('local', {
    successRedirect: '/', // Redirect to the home page on successful login
    failureRedirect: '/login', // Redirect back to the login page on failure
    //failureFlash: true // Optional: use flash messages to report login failure
}));