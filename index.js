// index.js
const express = require("express");
const path = require("path");
const utils = require('./utils/utils.js')
const CONFIG = require("./utils/config")
const Logger = require("./utils/logger")
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || "10030";
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
})


Logger.createFile() // start the logger

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "css")));
app.set(express.json());
app.set("socket.io", io);

//setting up routes
const homeRouter = require("./routes/home.js")(io);
const vicdRouter = require("./routes/vicd.js")(io);


//setting up GET requests for routes
app.get("/", homeRouter);
app.get('/vicd', vicdRouter);


server.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});


//socket handlers
io.on("connection", (socket) => {
  Logger.log(`------ User Connected : ${socket.id} --------`,"")
  
  //home page
  socket.on(CONFIG.socketStrings.home.route, () => {
    Logger.log(`${socket.id} reached home page`, "")
    let lastUpdateTime = null;
    let intervalID = setInterval(() => {
      let fileModifiedTime = utils.getLastModifiedTime(CONFIG.paths.logs.testData) // current file time
      
      if (socket.connected) {
        if (utils.isUpdated(lastUpdateTime, fileModifiedTime)){ //if true, emit socket
          const data = utils.getData(hasGraph = 1);
          Logger.log(`${socket.id} File Updated, emitting new data back to client`, "New Data:" + JSON.stringify(data, null, " ") )
          socket.emit(CONFIG.socketStrings.home.getData, (data) );
          lastUpdateTime = utils.getLastModifiedTime(CONFIG.paths.logs.testData)
        } else {// else do nothing
          //Logger.log("Files for Home page have not been modified", "Skipping socket emit")
        }
        
      }
      else { // exit interval loop if socket is not connected
        clearInterval(intervalID);
      };
    }, 2000)
  })

  //vicd page
  socket.on(CONFIG.vicd.socketStrings.route, () => {
    Logger.log(`${socket.id} reached vicd page`, "")
    let lastUpdateTime = utils.getLastModifiedTime(CONFIG.vicd.paths.testGraph);
    let intervalID = setInterval(() => {
      let fileModifiedTime = utils.getLastModifiedTime(CONFIG.vicd.paths.testGraph) // current file time
      
      if (socket.connected) {
         if (utils.isUpdated(lastUpdateTime, fileModifiedTime)){ //if true, emit socket
          const data = utils.getData(CONFIG.vicd);
          Logger.log(`${socket.id} File Updated, emitting new data back to client`, "New Data:" + JSON.stringify(data, null, " ") )
          socket.emit(CONFIG.vicd.socketStrings.getData, (data) );
          lastUpdateTime = utils.getLastModifiedTime(CONFIG.vicd.paths.testGraph)
        } else {// else do nothing
        //   //Logger.log("Files for Home page have not been modified", "Skipping socket emit")
        }
        
      }
      else { // exit interval loop if socket is not connected
        clearInterval(intervalID);
      };
    }, 2000)
  })
  // Listen for socket disconnection
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`)
    Logger.log(`${socket.id} disconnected`, "")
  })
});