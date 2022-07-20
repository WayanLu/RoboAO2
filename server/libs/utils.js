const fs = require('fs')
const CONFIG = require("./config")
const Logger = require("./logger")
const Helper = require("./helper")


/* 
    isUpdated()

    Compares two datetime values and returns true or false if times are different
*/
exports.isUpdated = (lastUpdateTime, currentUpdateTime) => {
    if (JSON.stringify(lastUpdateTime) == JSON.stringify(currentUpdateTime)){
        return false
    } else {
        return true
    }
}

/*
    getLastModifiedTime()

    Gets a files last modified time
*/
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

exports.getData = (dataConfig) => { // change 
    //------------ Telemetry --------------
    switch(dataConfig.paths.testGraph){
        case CONFIG.vicd.paths.testGraph:
            dataConfig.telemetry = Helper.readVICDlog(dataConfig.telemetry, dataConfig.paths.log)
            break
        //// Add case for new component
    }

    dataConfig.image = Helper.getImage(dataConfig.image)
    dataConfig.graph = Helper.getGraphData(dataConfig.graph)
    dataConfig.status = Helper.getStatusData()
    
    return dataConfig
}

// function readVICDlog(telemetryConfig ,filepath){
//     const line  = getLastLine(filepath)
//     const lineArray = line.split(" " || "  ").filter(element => element !== '') // taking out empty elements
    
//     telemetryConfig.test1.unix.data = lineArray[0]
//     telemetryConfig.test1.dateTime.data = lineArray[1] + " " +  lineArray[2].split(".")[0]
//     telemetryConfig.test1.daemon.data = lineArray[3]
//     if (telemetryConfig.test1.daemon.data === 0){ // daemon = 0, no more telemetry data
//         return telemetryConfig
//     }

    
//     return telemetryConfig
// }

