//Client side script for home
//the variable data contains information about the page and socket


const socket = io();
console.log(data)
try {
    statusUpdate(data)
    socket.emit(data.socketStrings.route);
    generateVisuals(data)
} catch (error) {
    console.log(error)
}

socket.on(data.socketStrings.getData, (socketData) => {
    console.log("get_home_data")
    try{
        statusUpdate(socketData)
        modifyVisuals(socketData)
    } catch (error) {
        console.log(error)
    }
})


////////////////// Functions 
/* 
    Function that generates the html elements on first get request to the page, iterates through the data
    sent from the server and creates html elements with the appropriate data
*/
function generateVisuals(data) {
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
            const imageContainer = document.querySelector(".image")


            for(index in image){
                const dict = image[index]
                const imageElement = new Image()

                imageElement.classList = "content"
                imageElement.id = `image${index}`
                imageElement.src = 'data:image/jpeg;base64,' + dict.imageBuffer;

                imageContainer.appendChild(imageElement)
            }
            
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
} // end generateVisuals()


/*
    modifyVisuals()
    
    Telemetry:
        - Uses the keyname to get the element on the webpage and update its contents
    Image:
        - The image id is `image#` and the index of the image list is how it gets the element
        and updates the image
    Graph:
        - Gets the graph element, destroys the Chart object and creates a new Chart object with the new
        data
*/
function modifyVisuals(data){
    const telemetry= data.telemetry
    const image = data.image
    const graph = data.graph
    try {
        if (telemetry != null) {
            for (const [tableName, content] of Object.entries(telemetry)) {
                for (const [name, value] of Object.entries(content)) {
                    const element = document.getElementById(`${name}`) //get specific telemetry element
                    element.textContent = value.data || 2
                }
            }
        }
        if (image != null) {
            for(index in  image){
                const picture = document.getElementById(`image${index}`) // image element
                picture.src = 'data:image/jpeg;base64,' + dict.imageBuffer;
            }
        }
        if (graph != null) {
            const chart = Chart.getChart('chart').getContext("2d").chart //get chart element
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
    statusUpdate()

    Function to update the status colors of each componenet
    Iterates through each key of data.status and the key name refers to each tab 
    on the webpage. Each tab has its own css #id which is also the key name
*/
function statusUpdate (data) {
    try {
        const status = data.status
        const component = document.querySelector(".component")
        for (const [tabName, statusLevel] of Object.entries(status)){
            const tab = document.getElementById(`${tabName}`)
            tab.id = statusLevel
            
            if (component.classList.contains(tabName)){
                component.classList.add(statusLevel)
            }
        }
        
    }catch (error) {
        console.error(error)
    }
}