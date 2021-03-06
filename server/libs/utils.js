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

/*

*/
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

