const express = require("express")
const router = express.Router()

router.get("/queueInformation", (req,res) => {
    res.render("queueInformation", {})
})

module.exports = router