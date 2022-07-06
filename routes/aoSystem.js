const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")

module.exports = function (io) {
    //When user is on ao system page, render aoSystem.pug
    router.get("/aoSystem", (req, res) => {
        res.render("aoSystem", {});
    })

    return router;
}