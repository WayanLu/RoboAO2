// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const home = require("./routes/home.js");

/**
 * App Variables
 */
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || "3001";
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
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

// io.on("connection", (socket) => {
//   console.log(`user connected: ${socket.id}`);

//   socket.on("home_reached", () => {
//     console.log("back to server")
//     socket.emit("get_home_data", {text: "home tests"})
//   })
// });

server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

