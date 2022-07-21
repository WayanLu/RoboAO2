const express = require("express")
const router = express.Router()
const utils = require("../libs/utils.js")
const CONFIG = require("../libs/config")
module.exports = function (io) {
    //When user is on home page, render index.pug
    router.get("/", (req, res) => {
        // const data = utils.getData(CONFIG.paths.logs.testData,CONFIG.paths.images, CONFIG.vicd.paths.testGraph)
        // data['socket'] = CONFIG.socketStrings.home
        // res.render("index", {data});
        res.render("index")
    })

    return router;
}