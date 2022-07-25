module.exports = {
    // delete above 
    vicd: {
        paths: {
            log: "./data/vicd.dat",
            testGraph: "./data/testdata.txt"
        },
        socketStrings: {
            route: "vicd",
            getData: "get_vicd_data"
        },
        telemetry: {
            test1: {
                unix: {
                    data: null,
                    title: "Unix Time"
                },
                dateTime: {
                    data: null,
                    title: "Date & Time"
                },
                daemon: {
                    data: null,
                    title: "Daemon State"
                },
                
            },
            test2: {
                errorCode: {
                    data: null,
                    title: "Error Code"
                },
                observeMode: {
                    data: null,
                    title: "Observing Mode"
                },
                current: {
                    data: null,
                    title: "Current"
                },
                observing: {
                    data: null,
                    title: "Observing"
                }
            },
            test3: {
                ccdTemp: {
                    data: null,
                    title: "CCD Temp"
                },
                ccdSetTemp: {
                    data: null,
                    title: "CDD Set Temp"
                },
                coolerOn: {
                    data: null,
                    title: "Cooler On?"
                },
                coolerSetPoint: {
                    data: null,
                    title: "Cooler Set Temp?"
                },
                coolerStable: {
                    data: null,
                    title: "Cooler Stable?"
                },
                dataState: {
                    data: null,
                    title: "Data State"
                },
                localInfo: {
                    data: null,
                    title: "Local Info"
                }
            }
        },
        image: [{
                path: "./data/pug.jpeg",
                imageBuffer: null
            },
            {
                path:"./data/turtle.jpg",
                imageBuffer: null
            },
        ],
        graph: {
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
                },
            },
            status: null,

        }
    },

}
