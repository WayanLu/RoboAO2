const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")

module.exports = function (io) {
    //When user is on home page, render index.pug
    router.get("/", (req, res) => {
        res.render("index", {});
    })
    return router;
}