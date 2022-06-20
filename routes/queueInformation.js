const express = require("express")
const router = express.Router()


const jsonData = require("../testdata.json")

router.get("/queueInformation", (req,res) => {
    res.render("queueInformation", {jsonData})
})

module.exports = router