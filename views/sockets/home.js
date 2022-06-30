//Client side script for home
const socket = io();
console.log("home",socket);
socket.emit("home_reached");
console.log("emitted home_reached")

socket.on("get_home_data", (data) => {
    console.log("get_home_data")

    const picture = document.getElementById("image")
    picture.src = 'data:image/jpeg;base64,' + data.imageBuffer;

    const tempid = document.querySelector("#test")
    tempid.textContent = data.text.data
}) 