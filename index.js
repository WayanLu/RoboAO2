// index.js
/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const utils = require('./utils/utils.js')
const CONFIG = require("./utils/config")
/**
 * App Variables
 */
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || "10030";
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

//setting up routes
const homeRouter = require("./routes/home.js")(io);
const queueInfoRouter = require("./routes/queueInformation.js")(io);
//const lchFileStatusRouter = require("./routes/lchFileStatus.js")(io);
const aoSystemRouter = require("./routes/aoSystem.js")(io);
const aoLoopRouter = require("./routes/aoLoop.js")(io);

//setting up GET requests for routes
app.get("/", homeRouter);
app.get('/queueInformation', queueInfoRouter);

app.get("/aoSystem", aoSystemRouter);
app.get("/aoLoop", aoLoopRouter);


server.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});


//socket handlers
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  //home page
  socket.on(CONFIG.socketStrings.home.route, () => {
    let lastUpdateTime = null;
    let intervalID = setInterval(() => {
      let fileModifiedTime = utils.getLastModifiedTime(CONFIG.paths.logs.testData) // current file time
      
      if (socket.connected) {
        if (utils.isUpdated(lastUpdateTime, fileModifiedTime)){ //if true, emit socket
          // TODO
          const data = utils.getData(hasData = CONFIG.paths.logs.testData, hasImage = CONFIG.paths.images.pugImage);
          console.log(data)
          socket.emit(CONFIG.socketStrings.home.getData, (data) );
          
          lastUpdateTime = utils.getLastModifiedTime(CONFIG.paths.logs.testData)
        } else {
          console.log("not updated, skip emit")
        }
      }
      else { // exit interval loop if socket is not connected
        clearInterval(intervalID);
      };
    }, 2000)
  })

  //queueinformation page
  socket.on("queueInformation", () => {
    let intervalID = setInterval(() => {

      if (socket.connected) {
        const data = utils.readQueueInfoData().data

        socket.emit("send_queueInfo_data", {
          text: data,
          socket: socket.id
        }, 2000)

      } else { // exit interval loop
        clearInterval(intervalID)
      }

    }, 2000);
  })

  // Listen for socket disconnection
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`)
  })
});