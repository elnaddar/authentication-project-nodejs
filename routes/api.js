const express = require("express");
const apiRouter = express.Router();

module.exports = apiRouter;

apiRouter.use("/", require("./index"));
apiRouter.use("/register", require("./register"));
apiRouter.use("/login", require("./login"));
apiRouter.use("/logout", require("./logout"));