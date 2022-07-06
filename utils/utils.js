const fs = require('fs')
const CONFIG = require("../utils/config")
// function to check if a log is updated or not
function getImage (imagePath)  {
    // TODO
    let imgBuffer = fs.readFileSync(imagePath)
    return imgBuffer.toString('base64')
}

// function readData() {
//     try{
//         const data = fs.readFileSync("testdata.txt",{
//             encoding : "utf-8",})
        
        
//         const lineArray = data.trim().split('\n')
//         const lastLine = lineArray[lineArray.length - 1]
        
//         return {
//             data: lastLine,
//             response: true
//         }
//     } catch (error) {
//         return {
//             data: error,
//             response: false
//         }
//     }
// }

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

// HOME
exports.readHomeData = () => {
    const data = readData()
    const imageBuffer = getImage("pug.jpeg")

    if (data.response && data.data != ""){ //Parsed log correctly
        return {data, imageBuffer}
    } else { // error
        return data.data
    }
}

// QUEUE INFORMATION
exports.readQueueInfoData = () => {
    const data = readData()
    data['image'] = getImage("pug.jpeg")

    if (data.response){ //Parsed log correctly
        

        return data
    } else { // error
        return data.data
    }
}

///// Testing out making a more robust get function
function readData(filePath) {
    const fileInfo =fs.readFileSync(filePath, {encoding: "utf-8",})
    const data = JSON.parse(fileInfo)
    return data
}
exports.getData = (hasData = null, hasImage = null, hasGraph = null) => {
    const data = {
        info: null,
        image: null,
        graph: null
    }

    if (hasData != null) {
        data.info = readData( hasData)
    }

    if (hasImage != null) {
        data.image = getImage( hasImage)
    }

    if (hasGraph != null) {

    }
    return data

}