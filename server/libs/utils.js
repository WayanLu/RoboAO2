const fs = require('fs')
const CONFIG = require("./config")
const Logger = require("./logger")
const Helper = require("./helper")


/* 
    isUpdated()

    Compares two datetime values and returns true or false if times are different
*/
exports.isUpdated = (lastUpdateTime, currentUpdateTime) => {
    Logger.log("isUpdated", {lastUpdateTime, currentUpdateTime})
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
    Logger.log("getLastModifiedTime()", filePath)
    const {mtime} = fs.statSync(filePath)

    return mtime
}

/*
    Unused

    Parses a text file that is in json format
*/
function readData(filePath) {
    const fileInfo =fs.readFileSync(filePath, {encoding: "utf-8",})
    const data = JSON.parse(fileInfo)
    return data
}



/*
    getData()

    Main function for data retrieval. Checks which component that is being requested and gets all the
    data to be returned in a dictonary
*/
exports.getData = (dataConfig) => { 
    //------------ Telemetry --------------
    Logger.log("getData()", "")
    //CHANGE THE SWITCH CASE AND THE CASES ONCE THERE ARE ACTUAL TELEMETRY LOGS
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

