const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.send("status")
})

router.get("/pages/queueInformation", (req,res) => {
    res.send("queue information")
})


module.exports = router