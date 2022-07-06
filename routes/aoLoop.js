const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")

module.exports = function (io) {
    //When user is on ao loop page, render aoLoop.pug
    router.get("/aoLoop", (req, res) => {
        res.render("aoLoop", {});
    })

    return router;
}