const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")
const CONFIG = require("../utils/config")

// const data = {
//     info :{
//         General: {
//             timestamp: "01:01:0111",
//             project: "test project",
//             name: "test name",
//             state: "test state"
//         },
//         Object: {
//             ra: "RA test",
//             dec: "Novemeber",
//             epoch: 1,
//             mag: 2.85
//         },
//         Observation: {
//             exposure: "Not too bad",
//             filter: 4.2
//         }
//     },
//     image: null,
//     graph: null,
//     socket: CONFIG.socketStrings.home
// }
module.exports = function (io) {
    //When user is on home page, render index.pug
    router.get("/", (req, res) => {
        const data = utils.getData(hasData = CONFIG.paths.logs.testData, hasImage = CONFIG.paths.images.pugImage)
        data['socket'] = CONFIG.socketStrings.home
        res.render("index", {data});
    })

    return router;
}