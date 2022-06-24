const express = require("express")
const router = express.Router()
const utils = require("../utils/utils.js")

module.exports = function (io) {
    router.get("/", async (req, res) => {
        res.render("index", {});
    })
    io.on("connection", (socket) => {
        console.log(`user connected: ${socket.id}`);
        socket.on("home_reached", () => {
            setInterval(() => {
                console.log("Calling readHomeData")
                let data = utils.readHomeData().data;
                socket.emit("get_home_data", {
                    text: data,
                    socket: socket.id
                }) 
            },2000)
            // socket.emit("get_home_data", {
            //     text: temp
            // })
        })
    });


    // router.get("/", async (req, res) => {
    //     res.render("index", {});
    // })

    return router;
}