const fs = require('fs')
// function to check if a log is updated or not
function getImage ()  {
    // TODO
    let imgBuffer = fs.readFileSync('pug.jpeg')
    return imgBuffer.toString('base64')
}

function readData() {
    try{
        const data = fs.readFileSync("testdata.txt",{
            encoding : "utf-8",})
        
        
        const lineArray = data.trim().split('\n')
        const lastLine = lineArray[lineArray.length - 1]
        
        return {
            data: lastLine,
            response: true
        }
    } catch (error) {
        return {
            data: error,
            response: false
        }
    }
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

// HOME
exports.readHomeData = () => {
    const data = readData()
    const imageBuffer = getImage()

    if (data.response && data.data != ""){ //Parsed log correctly
        return {data, imageBuffer}
    } else { // error
        return data.data
    }
}

// QUEUE INFORMATION
exports.readQueueInfoData = () => {
    const data = readData()
    data['image'] = getImage()

    if (data.response){ //Parsed log correctly
        

        return data
    } else { // error
        return data.data
    }
}

