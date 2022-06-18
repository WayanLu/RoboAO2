// index.js

/**
 * Required External Modules
 */
const { Console } = require("console");
const express = require("express");
const path = require("path");
const homeRouter = require("./routes/home.js")
const queueInfoRouter = require("./routes/queueInformation.js")
/**
 * App Variables
 */
const app = express();
app.use(logger)
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "css")));
app.set(express.json());
/**
 * Routes Definitions
 */
app.get("/home", homeRouter)
app.get("/queueInformation", queueInfoRouter)

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

function logger(req,res,next) {
  console.log("Log")
  next()
}