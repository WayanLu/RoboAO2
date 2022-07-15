//Client side script for home
//the variable data contains information about the page and socket
// 


const socket = io();
console.log(data)
try {
    statusUpdate(data)
    socket.emit(data.socketStrings.route);
    generateTelemetryVisuals(data)
} catch (error) {
    console.log(error)
}

// TODO
socket.on(data.socketStrings.getData, (socketData) => {
    console.log("get_home_data")
    try{
        statusUpdate(socketData)
        modifyTelemetryVisuals(socketData)
        
    } catch (error) {
        console.log(error)
    }
})


// Function that generates the html elements on first get request to the page, iterates through the data to 
function generateTelemetryVisuals(data) {
    const telemetry = data.telemetry
    const image = data.image
    const graph = data.graph
    
    try{
        if (telemetry != null) {
            const telemetryContainer = document.querySelector(".telemetry")

            for (const [tableName, content] of Object.entries(telemetry)) {
                // Setting up table structure
                const table = document.createElement('table')
                const thead = document.createElement('thead')
                const topRow = document.createElement('tr')
                const tableTitle = document.createElement('th')

                tableTitle.colSpan = 2
                tableTitle.textContent = tableName // This is the Table Name
                topRow.appendChild(tableTitle)
                table.appendChild(thead)
                thead.appendChild(topRow)

                for (const [name, value] of Object.entries(content)) {
                    //Creating data rows
                    const dataRow = document.createElement("tr")
                    const cellName = document.createElement("th")
                    const cellInfo = document.createElement("th")
                    cellInfo.id = name // setting element id
                    cellName.textContent = value.title // This is the name for the data
                    cellInfo.textContent = value.data || 2 // This is the data 
                    dataRow.appendChild(cellName)
                    dataRow.appendChild(cellInfo)
                    thead.appendChild(dataRow)
                }
                telemetryContainer.appendChild(table)
            }
        }
        if (image != null) {
            const picture = document.getElementById("image")
            picture.src = 'data:image/jpeg;base64,' + image.imageBuffer;
        }
        if (graph != null) {
            const chartElem = document.createElement('CANVAS')
            chartElem.setAttribute('id', "chart")
            const graphDiv = document.querySelector('.graph')
            graphDiv.appendChild(chartElem)
            const myChart = new Chart(
                chartElem,
                graph
            )
        }
        
    } catch (error){
        console.log(error)
    }
}


function modifyTelemetryVisuals(data){
    const telemetry= data.telemetry
    const image = data.image
    const graph = data.graph
    try {
        if (telemetry != null) {
            // making elements
            for (const [tableName, content] of Object.entries(telemetry)) {
                for (const [name, value] of Object.entries(content)) {
                    const element = document.getElementById(`${name}`)
                    element.textContent = value.data || 2
                }
            }
        }
        if (image != null) {
            const picture = document.getElementById("image")
            picture.src = 'data:image/jpeg;base64,' + image.imageBuffer;
        }
        if (graph != null) {
            const chart = Chart.getChart('chart').getContext("2d").chart
            if (chart === undefined){
                console.log("Did not get chart")
            } else {
                chart.destroy()
            }
            const newChart = document.querySelector("#chart")

            chartInstance = new Chart(
                newChart,
                graph
                )
        }

    } catch(error) {
        console.log(error)
    }
}

/*
    Function to update the status colors of each componenet
    Iterates through each key of data.status and the key name refers to each tab 
    on the webpage. Each tab has its own css #id which is also the key name
*/
function statusUpdate (data) {
    try {
        const status = data.status
        for (const [tabName, statusLevel] of Object.entries(status)){
            const tab = document.getElementById(`${tabName}`)
            tab.className = statusLevel
        }
        
    }catch (error) {
        console.error(error)
    }
}