//Client side script for home
//the variable data contains information about the page and socket
// 
const socket = io();
console.log("home", socket);
socket.emit(data.socket.route);
console.log("emitted home_reached")
generateTelemetryVisuals(data)

// TODO
socket.on(data.socket.getData, (socketData) => {
    console.log("get_home_data")
    modifyTelemetryVisuals(socketData)

})


// Function that generates the html elements on first get request to the page, iterates through the data to 
function generateTelemetryVisuals(data) {
    const info = data.info
    const image = data.image
    const graph = data.graph

    if (info != null) {
        const telemetryContainer = document.querySelector(".telemetry")
        // making elements
        for (const [tableName, content] of Object.entries(info)) {

            const table = document.createElement('table')
            const thead = document.createElement('thead')
            const topRow = document.createElement('tr')
            const tableTitle = document.createElement('th')
            tableTitle.colSpan = 2
            tableTitle.textContent = tableName
            topRow.appendChild(tableTitle)
            table.appendChild(thead)
            thead.appendChild(topRow)

            for (const [name, value] of Object.entries(content)) {
                const dataRow = document.createElement("tr")
                const cellName = document.createElement("th")
                const cellInfo = document.createElement("th")
                cellInfo.classList.add(name)
                cellName.textContent = name
                cellInfo.textContent = value
                dataRow.appendChild(cellName)
                dataRow.appendChild(cellInfo)
                thead.appendChild(dataRow)
            }
            telemetryContainer.appendChild(table)
        }
    }
    if (image != null) {
        const picture = document.getElementById("image")
        picture.src = 'data:image/jpeg;base64,' + image;
    }
    if (graph != null) {

    }
}

function modifyTelemetryVisuals(data){
    const info = data.info
    const image = data.image
    const graph = data.graph

    if (info != null) {
        // making elements
        for (const [tableName, content] of Object.entries(info)) {
            for (const [name, value] of Object.entries(content)) {
            
                const element = document.querySelector(`.${name}`)
                element.textContent = value
            }
        }
    }
    if (image != null) {
        const picture = document.getElementById("image")
        picture.src = 'data:image/jpeg;base64,' + image;
    }
    if (graph != null) {

    }
}
