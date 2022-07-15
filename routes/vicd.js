const express = require("express");
const utils = require("../utils/utils")
const CONFIG = require("../utils/config")
const router = express.Router()


module.exports = function (io) {
    router.get("/vicd", (req,res) => {
        const vicdCopy = {...CONFIG.vicd}
        console.log(vicdCopy)
        const data = utils.getData(vicdCopy)
        console.log("GET:", data)
        res.render('vicd', {data});
    });

    return router;
}
