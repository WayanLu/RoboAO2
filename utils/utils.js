const fs = require('fs')
const CONFIG = require("../utils/config")
const Logger = require("../utils/logger")
// function to check if a log is updated or not
function getImage (imagePath)  {
    // TODO
    let imgBuffer = fs.readFileSync(imagePath)
    return imgBuffer.toString('base64')
}

function getLastLine(filepath) {
    const data = fs.readFileSync(filepath,{
        encoding : "utf-8",})
    
    
    const lineArray = data.trim().split('\n')
    const lastLine = lineArray[lineArray.length - 1]
    return lastLine
    
}

exports.isUpdated = (lastUpdateTime, currentUpdateTime) => {
    if (JSON.stringify(lastUpdateTime) == JSON.stringify(currentUpdateTime)){
        return false
    } else {
        return true
    }
}

exports.getLastModifiedTime = (filePath) => {
    const {mtime} = fs.statSync(filePath)

    return mtime
}

///// Testing out making a more robust get function
function readData(filePath) {
    const fileInfo =fs.readFileSync(filePath, {encoding: "utf-8",})
    const data = JSON.parse(fileInfo)
    return data
}

function getStatusData(){
    const levels = ['good', 'warning', 'danger']
    const status = {
        home: levels[Math.floor(Math.random() * levels.length)],
        vicd: levels[Math.floor(Math.random() * levels.length)]
    }
    return status
}

function testGraphData() {
    const file = fs.readFileSync(CONFIG.vicd.paths.testGraph ,{encoding: "utf-8",})
    const lineArray = file.trim().split('\n')
    const dataset = []
    const labels = []
    for(line of lineArray){
        const data = JSON.parse(line)
        const x = new Date(data.General.timestamp)
        const y = parseInt(data.Object.epoch)
        dataset.push({x: x.toLocaleString(), y: y})
        labels.push(x)
    }
    return [dataset, labels]
    //console.log(file)
}
function getGraphData(graphConfig,) {
    const [dataset, labels] = testGraphData()

    graphConfig.data.datasets[0].data = dataset
    console.log("TEST",graphConfig.data.datasets[0].data)
    return graphConfig
}
exports.getData = (dataConfig) => { // change 
    //------------ Telemetry --------------
    switch(dataConfig.paths.testGraph){
        case CONFIG.vicd.paths.testGraph:
            dataConfig.telemetry = readVICDlog(dataConfig.telemetry, dataConfig.paths.log)
            break

    }

    dataConfig.image.imageBuffer = getImage(dataConfig.image.path)
    dataConfig.graph = getGraphData(dataConfig.graph)
    dataConfig.status = getStatusData()
    
    return dataConfig
}

function readVICDlog(telemetryConfig ,filepath){
    const line  = getLastLine(filepath)
    const lineArray = line.split(" " || "  ").filter(element => element !== '') // taking out empty elements
    
    telemetryConfig.test1.unix.data = lineArray[0]
    telemetryConfig.test1.dateTime.data = lineArray[1] + " " +  lineArray[2].split(".")[0]
    telemetryConfig.test1.daemon.data = lineArray[3]
    if (telemetryConfig.test1.daemon.data === 0){ // daemon = 0, no more telemetry data
        return telemetryConfig
    }

    
    return telemetryConfig
}

