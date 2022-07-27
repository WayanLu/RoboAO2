const express = require("express");
const utils = require("../libs/utils")
const CONFIG = require("../libs/config")
const router = express.Router()
const Logger = require("../libs/logger")


module.exports = function (io) {
    router.get("/vicd", (req,res) => {
        const vicdCopy = {...CONFIG.vicd}
        const data = utils.getData(vicdCopy)
        Logger.log("Rendering VICD data" , "") //JSON.stringify(data, null, " "))
        res.render('vicd', {data});
    });

    return router;
}
