const express = require("express");
const logout = express.Router();

module.exports = logout;

logout.get('/', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});