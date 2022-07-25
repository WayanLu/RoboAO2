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
    lineToArray()

    Takes a line and turns it into an array where it splits based on " "
*/
exports.lineToArray = (line) => {
    const lineArray = line.split(" " || "  ").filter(element => element !== '')

    return lineArray
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

    ** As of right now this is just a place holder function for calculating the status of each component

    **** Make sure the status component key name corresponds to the CONFIG.component name
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
/*
    createDataPoint()

    Helper function to take in an x and y value and convert it into a datapoint for 
    graphs. This could be useful when pulling data from a database
*/
exports.createDataPoint = (xVal, yVal) => {
    return {x : xVal, y : yval}
}


////////////// Functions for parsing telemetry data ////////////////////////
/* 
    readVicdLog()

    Parses the last line of telemetry file related to VICD and assigns values to each data entry of the
    telemetry config
*/
exports.readVICDlog = (telemetryConfig ,filepath) => {
    const line  = Helper.getLastLine(filepath)
    const lineArray = Helper.lineToArray(line) // taking out empty elements
    
    
    // Datapoints that need fix are incomplete
    telemetryConfig.test1.unix.data = lineArray[0]
    telemetryConfig.test1.dateTime.data = lineArray[1] + " " +  lineArray[2].split(".")[0]
    telemetryConfig.test1.daemon.data = lineArray[3]
    if (telemetryConfig.test1.daemon.data === 0){ // daemon = 0, no more telemetry data
        return telemetryConfig.test1
    }
    telemetryConfig.test2.errorCode.data = lineArray[4]
    telemetryConfig.test2.observeMode.data = lineArray[5]
    telemetryConfig.test2.current.data = lineArray[6]
    telemetryConfig.test2.observing.data = "Need fix"
    telemetryConfig.test3.ccdTemp.data = lineArray[10]
    telemetryConfig.test3.ccdSetTemp.data = lineArray[11]
    telemetryConfig.test3.coolerOn.data = lineArray[12]
    telemetryConfig.test3.coolerSetPoint.data = lineArray[13]
    telemetryConfig.test3.coolerStable.data = lineArray[14]
    telemetryConfig.test3.dataState.data = "Need fix"


    telemetryConfig.test3.localInfo.data = lineArray[24]
    telemetryConfig['test4'] = {
        boto: {
            data: 4,
            title: "Data State"
        },
        tesl: {
            data: 4,
            title: "Local Info"
        }
    }
    telemetryConfig['test5'] = {
        fads: {
            data: "uts",
            title: "Data State"
        },
        ldsg: {
            data: "boto",
            title: "Locasdadaal Info"
        },
        asdsf: {
            data: 1234,
            title: "Data State"
        },
        asfalgna: {
            data: null,
            title: "Local Info"
        }
    }
    
    return telemetryConfig
}

