const fs = require('fs');

const LOG = true; // Set to true or false to turn on logger
const FILENAME = "log.txt"

exports.createFile = () => {
    fs.writeFileSync(FILENAME,`---------Start Log File--------- ${Date()}`)
}

exports.log = (title, message) => {
    if (LOG){
        try {
            fs.writeFileSync(FILENAME, `${Date()}` + '\n' + title + '\n', {encoding: "utf-8", flag: "a"})
            fs.writeFileSync(FILENAME, message + '\n', {encoding: "utf-8", flag: "a"})
        } catch (err){
            console.log(err)
        }
    }
}

exports.logError = (error, message) => {
    if (LOG){
        try {
            fs.writeFileSync(FILENAME, + `${Date()}` + "\nERROR : " + error+ '\n', {encoding: "utf-8", flag: "a"})
            fs.writeFileSync(FILENAME, "Message : " + message + '\n', {encoding: "utf-8", flag: "a"})
        } catch (error) {
            console.log(error)
        }
    }
}