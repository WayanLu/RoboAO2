const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")
const jsonData = require("../testdata.json")

module.exports = function (io) {
    router.get("/queueInformation", (req,res) => {
        res.render('queueInformation', {jsonData});
    });

    
    return router;
}
