// server.js
const express = require("express");
const path = require("path");
const utils = require('./libs/utils.js')
const CONFIG = require("./libs/config")
const Logger = require("./libs/logger")
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || "10030";
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
})
Logger.createFile() // start the logger


const fixedPath = __dirname.replace("server","client")
//use middleware to serve static files
app.use(express.static('public'));
app.set("views", fixedPath)
app.set("view engine", "pug");
app.use(express.static(path.join(fixedPath, "css")))
app.set(express.json());
app.set("socket.io", io);

///////// Router Setup
const homeRouter = require("./routes/home.js")(io);
const vicdRouter = require("./routes/vicd.js")(io);


///////// Get Request for Routes
app.get("/", homeRouter);
app.get('/vicd', vicdRouter);


server.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});


const INTERVAL = 2000
//////////////////////////////// SOCKETS //////////////////////
io.on("connection", (socket) => {
  Logger.log(`------ User Connected : ${socket.id} --------`,"")

  // Interval that gets updated data 
  let dataUpdateInterval = setInterval(() => {
    
  }, 3000)
  
  //////////////// Home Page
  // socket.on(CONFIG.socketStrings.home.route, () => {
  //   Logger.log(`${socket.id} reached home page`, "")
  //   let lastUpdateTime = null;
  //   let intervalID = setInterval(() => {
  //     let fileModifiedTime = utils.getLastModifiedTime(CONFIG.paths.logs.testData) // current file time
      
  //     if (socket.connected) {
  //       if (utils.isUpdated(lastUpdateTime, fileModifiedTime)){ //if true, emit socket
  //         const data = utils.getData(hasGraph = 1);
  //         Logger.log(`${socket.id} File Updated, emitting new data back to client`, "New Data:" + JSON.stringify(data, null, " ") )
  //         socket.emit(CONFIG.socketStrings.home.getData, (data) );
  //         lastUpdateTime = utils.getLastModifiedTime(CONFIG.paths.logs.testData)
  //       } else {// else do nothing
  //         //Logger.log("Files for Home page have not been modified", "Skipping socket emit")
  //       }
        
  //     }
  //     else { // exit interval loop if socket is not connected
  //       clearInterval(intervalID);
  //     };
  //   }, INTERVAL)
  // })

  ////////////////// VICD Page
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
    }, INTERVAL)
  })







  //////////////////// Socket Disconnection
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`)
    Logger.log(`${socket.id} disconnected`, "")
  })
});