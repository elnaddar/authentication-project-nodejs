const express = require("express");
const index = express.Router();
const utils = require('../utils');

module.exports = index;

index.get(["/", "/index"], (req, res) => utils.renderPage(res, 'pages/index', { title: "home" }));
