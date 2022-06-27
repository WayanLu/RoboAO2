// index.js
/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const { disconnect } = require("process");
const home = require("./routes/home.js");
const utils = require('./utils/utils.js')
/**
 * App Variables
 */
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || "3001";
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "css")));
app.set(express.json());
app.set("socket.io", io);

const homeRouter = require("./routes/home.js")(io);
const queueInfoRouter = require("./routes/queueInformation.js")(io);

app.get("/", homeRouter);
app.get('/queueInformation', queueInfoRouter)

server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});


//socket handlers
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  
  //queueinformation
  socket.on("queueInformation", () => {
    let intervalID = setInterval(() => {
      
      if (socket.connected){
        console.log("calling readQueueData", socket.id)
      const data = utils.readQueueInfoData().data
      socket.emit("send_queueInfo_data", {
        text: data,
        socket: socket.id
      },2000)
    } else {
      console.log("exiting loop")
      clearInterval(intervalID)
    }

      
      
      // socket.on("disconnection", function(){
      //   console.log(`user ${socket.id} disconnected`)
      //   clearInterval(intervalID);
      // })
    }, 2000);
  })

  //home
  socket.on("home_reached", () => {
    //console.log(socket.server.eio.clients)
    let intervalID = setInterval(() => {
        if (socket.connected){
        console.log("Calling readHomeData", socket.id)
        let data = utils.readHomeData().data;
        socket.emit("get_home_data", {
          text: data,
          socket: socket.id
        })
      } else {
        clearInterval(intervalID);
      }
      }, 2000)
    })
  
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`)
  })
});