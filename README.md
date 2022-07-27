# RoboAO2
### A Dynamic Status Page for Robo-AO 2

## **Getting Started**
#### Libraries used:
- nodeJS
- express ^4.18.1
- nodemon ^2.0.16
- chartjs ^3.8.0
- socketio ^4.5.1
- pug ^3.0.2
- jest ^28.1.3


## **Steps for installing if you want to develop the webpage on an IDE**
1. Install NodeJS (https://nodejs.org/en/download/), if you want to use a package manager (https://nodejs.org/en/download/package-manager/)
2. If haven't installed npm, go on terminal and enter the command (https://www.npmjs.com/package/npm)
    ```
    npm i npm
    ```
    ___
3. ExpressJS (https://www.npmjs.com/package/express)
    ```
    npm i express
    ```
    ___
4. Install nodemon (https://www.npmjs.com/package/nodemon)
    ```
    npm i nodemon
    ```
    nodemon is a development library that allows you to not have to restart the application when making changes
    ___
5. Install chartjs (https://www.npmjs.com/package/chart.js) \

    API Documentation can be found here https://www.chartjs.org/docs/latest/
    ```
    npm i chart.js
    ```
    ___
6. Install pug (https://www.npmjs.com/package/pug) 
    ```
    npm i pug
    ```
    ___
7. Install socketIO (https://www.npmjs.com/package/socket.io)
    ```
    npm i socket.io
    npm i socket.io-client
    ```
    ___
8. Install Jest (https://www.npmjs.com/package/jest)
    ```
    npm i -D jest
    ```

# Codebase
The web application consists of two folders, ```client``` and ```server```. ```client``` folder deals with the browser which includes pug, css, and the client side javascript file. The client side javascript ```client.js``` is responsible for rendering the data sent from the server through socketio. The ```server``` folder consists of javascript files that handle data and server side sockets. ```server.js``` is the main file for running the application and its also where socketio on the server side emits and listens for events.
## Adding a component
___
```/server/libs/config.js```
- When adding a new component, add a new dictionary to the `modules.exports` in the config file.
    ```javascript
        test: {
            paths: {

            },
            socketStrings: {
                route: "testRoute",
                getData: "getTestData"
            },
            telemetry: {

            },
            image: {

            },
            graph: {

            },
            status:null,
        }
    ```

    - `paths` is responsible for containing the links to the specific components' telemetry log, for example 
        ```javascript 
        paths: {log: "./folder/folder/telemetry.dat"}
        ``` 
    - ```socketStrings``` contains the socket strings to emit and listen for events, there are two strings, ```route``` and ```getData```
    
        ![alt text](https://user-images.githubusercontent.com/71489250/179843640-0bcda8d3-b411-49aa-8419-a1a73d1f2525.png)
    

    - `telemetry` contains the structure for telemetry data. The structure for the data is as follows: 
        ```javascript
            telemetry: {
                testGroup1: {
                    testData1:{
                        data: "data",
                        title: "Data"
                    },
                    testData2:{
                        data: "Sunday",
                        title: "Day"
                    }
                },
            }
        ```

        - This structure is how the client side javascript parses the data to render on the browser. \
        **Important:** When creating names for the data and group dictionaries, do not use any special characters or spaces. This will cause problems for rendering the browser. The dictionary names are actually used to create class/id selectors so that they can be used to modify the html/pug elements later

    - `image` contains information for displaying images on the browser. There can be multiple images for a component
        ```javascript
            image: {
                [
                    {
                        path: "./image.jpg",
                        imageBuffer: null
                    },
                    {
                        ...
                    }
                ]
            }
        ```

    - `graph` contains the structure for displaying a graph with chartjs
        ```javascript
            graph:{
                type: 'line',
                data: {
                    datasets: [{
                        label: 'VICD',
                        data: [],
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 60,
                                minRotation: 60
                            },
                            title: {
                                display: true,
                                text: "Time Stamp"
                            }
                        },
                        y: {
                            max:100,
                            title: {
                                display: true,
                                text: "Value"
                            }
                        }
                    },
                    animation: {
                        duration: 0
                    }
                }
            }
        ```
        - For each component, change the values for the `label` and `x`,`y` titles. You can also set max `y` values and 
    - `status` is how the statuses for each component will be updated, just set it to null
___

```/server/server.js```
- With the config for the component created, make a router variable for the new component

    ```javascript
        ///////// Router Setup
        const homeRouter = require("./routes/home.js")(io);
        const vicdRouter = require("./routes/vicd.js")(io);
        const exampleRouter = require("./routes/example.js")(io) //new
        ///////// Get Request for Routes
        app.get("/", homeRouter);
        app.get('/vicd', vicdRouter);
        app.get('/example', exampleRouter) // new
    ```
- asda 

___

```/server/routes/```
- Make a javascript file with the name of the component, inside that file, copy and paste this code:

    ```javascript
    const express = require("express");
    const utils = require("../libs/utils")
    const CONFIG = require("../libs/config")
    const router = express.Router()
    const Logger = require("../libs/logger")


    module.exports = function (io) {
        router.get("/example", (req,res) => {
            const exampleCopy = {...CONFIG.example}
            //Logger.log("Rendering example data" , "")
            const data = utils.getData(exampleCopy)
            res.render('example', {data});
        });

        return router;
    }
    ```
- This is responsible for the GET request to the component webpage on the browser
___
```/client/```
- Create a pug file in this directory
    ```pug
    doctype html
    html(lang="en")
        head
            meta(charset="UTF-8")
            meta(http-equiv="X-UA-Compatible", content="IE=edge")
            meta(name="viewport", content="width=device-width, initial-scale=1.0")
            link(rel ="stylesheet" href="header.css")
            link(rel="stylesheet" href="display.css")
            script(src="socket.io/socket.io.js")
            script(src="https://cdn.jsdelivr.net/npm/chart.js")
            title Robo-AO 2 Status Page
            script(type = "text/javascript").
                const data = !{JSON.stringify(data)} // getting data from res.render
        body 
            include includes/header.pug
            div.component.home Home
    
            .container
                .telemetry-graph-container
                    h1 Telemetry
                    hr
                    .telemetry 
                        
                    .graph
                        h1 Graph
                        hr

                .image
                    h1 Image
                    hr
                    
            script
                include client.js
    ```
___
```/client/includes/header.pug```
- Add a tab for the new component. Change the class after .component
```pug
    div.topnav
            a#home(href="/") Home
            a#vicd(href="/vicd" ) VICD 
            a#example(href='/example') Example
```
```/server/server.js```
- Going back to server.js, add a socket handler for the new component
<img width="978" alt="Screen Shot 2022-07-19 at 2 21 16 PM" src="https://user-images.githubusercontent.com/71489250/179869655-8af1663e-f895-48f8-84a8-ba0bcf965770.png">

- Copy/Paste and edit this code:
    ```javascript
        socket.on(CONFIG.EXAMPLE.socketStrings.route, () => {
            Logger.log(`${socket.id} reached vicd page`, "")
            let lastUpdateTime = utils.getLastModifiedTime(CONFIG.EXAMPLE.paths.EXAMPLELOG);
            let intervalID = setInterval(() => {
            let fileModifiedTime = utils.getLastModifiedTime(CONFIG.EXAMPLE.paths.EXAMPLELOG) // current file time
            
            if (socket.connected) {
                if (utils.isUpdated(lastUpdateTime, fileModifiedTime)){ //if true, emit socket
                    const data = utils.getData(CONFIG.EXAMPLE);
                    Logger.log(`${socket.id} File Updated, emitting new data back to client`, "New Data:" + JSON.stringify(data, null, " ") )
                    socket.emit(CONFIG.EXAMPLE.socketStrings.getData, (data) );
                    lastUpdateTime = utils.getLastModifiedTime(CONFIG.EXAMPLE.paths.EXAMPLELOG)
                } else {// else do nothing
                //   //Logger.log("Files for Home page have not been modified", "Skipping socket emit")
                }
                
            }
            else { // exit interval loop if socket is not connected
                clearInterval(intervalID);
            };
            }, INTERVAL)
        })
    ```
- The socket handler is a interval loop of 2 seconds(2000ms). If the file of the telemetry data is not updated, it will not emit a getData event to the client. 
___
```/server/libs/utils.js```
- With all of the routing code implemented. The getData() function needs to correctly parse the data for the specific component. Make sure that the dictionary name for the switch case is the same across all components for telemetry
```javascript
    exports.getData = (dataConfig) => { // change 
    //------------ Telemetry --------------
        switch(dataConfig.paths.testGraph){
            case CONFIG.vicd.paths.testGraph:
                dataConfig.telemetry = Helper.readVICDlog(dataConfig.telemetry, dataConfig.paths.log)
                break
            // Add case for new componont
            case CONFIG.EXAMPLE.paths.EXAMPLELOG:
                dataConfig.telemetry = Helper.readEXAMPLELog(dataconfig.telemetry, dataConfig.paths.log)
                break
        }

        dataConfig.image = Helper.getImage(dataConfig.image)
        dataConfig.graph = Helper.getGraphData(dataConfig.graph)
        dataConfig.status = Helper.getStatusData()
        
        return dataConfig
}
```
___
```/server/libs/helper.js```
- In the helper file, this is where you will implement a function to uniquely parse telemetry logs for the specific component
    <img width="797" alt="Screen Shot 2022-07-19 at 4 18 53 PM" src="https://user-images.githubusercontent.com/71489250/179881877-9910655d-afe9-43b9-9ca6-37173d1be832.png">

- Also with telemetry data, there is also graph data
    <img width="721" alt="Screen Shot 2022-07-19 at 4 33 32 PM" src="https://user-images.githubusercontent.com/71489250/179883586-e852de13-4bde-4c35-84c4-21ca49e005c5.png">

- As of right now, the main way to get graph data is to have a seperate script that generates data entries that are relevant to the current timestamp. Hopefully in the future there will be a database that the server side code can pull data from. These switch cases is where you'd implement those functions.
- The structure for the data of graphs is a list of dictionaries:
```javascript
    const dataset = [
        {x: 0, y: 4},
        {x: 1, y: 2},
        {x: 2, y: 9},
    ]
```
- More documentation on chartJS can be found here (https://www.chartjs.org/docs/latest/)
___
## Logger
```/server/libs/logger.js```
- This file is a basic logger that outputs to a log file. There is a boolean variable that you can set to `true` or `false` to turn it on
- If you add another route or function, you can add a `Logger.log()` function

___
## Testing
```/server/test/```
- Documentation: https://jestjs.io/
- If you want to run all tests, type on terminal
    ```
    npm test
    ```

- For an individual test file,
    ```
    npm test /path/to/test.js
    ```
- `helper.test.js`
    - This tests the getGraphData() function to make sure data is correctly being retrieved for each compononent
- `utils.test.js`
    - This tests the getData() function to make sure that the config data is correctly being returned
- These test files basics run through each component and checks to see that the compononent config is properly retrieving data. If you want to run a test on an individual component, you would need to create a seperate test case for the related file.