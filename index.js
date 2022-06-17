// index.js

/**
 * Required External Modules
 */
 const express = require("express");
 const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "css")));
/**
 * Routes Definitions
 */
 app.get("/", (req, res) => {
    res.render("index", {});
  });
/**
 * Server Activation
 */
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });