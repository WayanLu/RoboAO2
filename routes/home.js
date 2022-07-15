const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")
const CONFIG = require("../utils/config")
module.exports = function (io) {
    //When user is on home page, render index.pug
    router.get("/", (req, res) => {
        const data = utils.getData(CONFIG.paths.logs.testData,CONFIG.paths.images, CONFIG.vicd.paths.testGraph)
        data['socket'] = CONFIG.socketStrings.home
        res.render("index", {data});
    })

    return router;
}