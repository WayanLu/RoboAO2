/////////// Helper Functions for utils.js
const fs = require("fs")
const CONFIG = require('./config')
const Helper = exports

/*
    getImage()

    Takes the image list and iterates through each image dictionary and assigns an imagebuffer value for that image
*/
exports.getImage = (imageConfig) => {
    const updatedImageConfig = imageConfig
    for(index in imageConfig){
        const imgBuffer = fs.readFileSync(imageConfig[index].path)
        updatedImageConfig[index].imageBuffer = imgBuffer.toString('base64')
    }
    return updatedImageConfig
}

/*
    getLastLine()

    Reads the file and returns the last line of the file
*/
exports.getLastLine = (filepath) => {
    const data = fs.readFileSync(filepath,{
        encoding : "utf-8",})
    
    
    const lineArray = data.trim().split('\n')
    const lastLine = lineArray[lineArray.length - 1]
    return lastLine
}

/*
    getStatusData()

    Returns a dictionary of the status levels of each component
*/
exports.getStatusData = () => {
    const levels = ['good', 'warning', 'danger']
    const status = {
        home: levels[Math.floor(Math.random() * levels.length)],
        vicd: levels[Math.floor(Math.random() * levels.length)]
    }
    return status
}

/*
    testGraphData()

    Example Test function to generate graph data

    ***** DELETE LATER
*/
exports.testGraphData = () =>{
    const file = fs.readFileSync(CONFIG.vicd.paths.testGraph ,{encoding: "utf-8",})
    const lineArray = file.trim().split('\n')
    const dataset = []
    const labels = []

    //Creates an array of {x: xVal,y: yVal} elements
    for(line of lineArray){
        const data = JSON.parse(line)
        const x = new Date(data.General.timestamp)
        const y = parseInt(data.Object.epoch)
        dataset.push({x: x.toLocaleString(), y: y})
        labels.push(x)
    }
    return [dataset, labels]
}

/*
    getGraphData()

    Function that creates a graph dictionary containing the information necessary to be displayed
    with Chartjs on the the browser
*/
exports.getGraphData = (graphConfig) => {
    const graph = graphConfig.data.datasets[0].labels
    const xLabel = graphConfig.options.scales.x.title.text
    const yLabel = graphConfig.options.scales.y.title.text

    //****** Add cases as you add more componenets
    switch(graph){
        case CONFIG.vicd.graph.data.datasets[0].labels: // Test Version ***** MODIFY LATER
            const [dataset, labels] = Helper.testGraphData()
            graphConfig.data.datasets[0].data = dataset
            break;
    }
    

    return graphConfig
}



////////////// Functions for parsing telemetry data ////////////////////////
/* 
    readVicdLog()

    Parses the last line of telemetry file related to VICD and assigns values to each data entry of the
    telemetry config
*/
exports.readVICDlog = (telemetryConfig ,filepath) => {
    const line  = Helper.getLastLine(filepath)
    const lineArray = line.split(" " || "  ").filter(element => element !== '') // taking out empty elements
    
    telemetryConfig.test1.unix.data = lineArray[0]
    telemetryConfig.test1.dateTime.data = lineArray[1] + " " +  lineArray[2].split(".")[0]
    telemetryConfig.test1.daemon.data = lineArray[3]
    if (telemetryConfig.test1.daemon.data === 0){ // daemon = 0, no more telemetry data
        return telemetryConfig
    }

    
    return telemetryConfig
}

