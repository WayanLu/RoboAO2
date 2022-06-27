const fs = require('fs')

function readData() {
    try{
        console.log("reading testdata")
        const data = fs.readFileSync("testdata.txt",{
            encoding : "utf-8",})
        
        const lineArray = data.trim().split('\n')
        const lastLine = lineArray[lineArray.length - 1]
        
        return {
            data: lastLine,
            response: true
        }
    } catch (error) {
        console.error(error)
        return {
            data: error,
            response: false
        }
    }
}

exports.readQueueInfoData = () => {
    const data = readData()

    if (data.response && data.data != ""){ //Parsed log correctly
        

        return data
    } else { // error
        return data.data
    }
}

exports.readHomeData = () => {
    const data = readData()

    if (data.response && data.data != ""){ //Parsed log correctly
        

        return data
    } else { // error
        return data.data
    }
}

