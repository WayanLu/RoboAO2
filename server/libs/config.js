module.exports = {
    home: {
        paths: {
            testGraph:"home"
        },
        socketStrings: {
            route: "home",
            getData: "get_home_data",
        },
        telemetry:{
            Vicd: {
                date: {
                    data: null,
                    title: "Date"
                },
                time:{
                    data: null,
                    title: "Time"
                },
                errorCode: {
                    data: null,
                    title: "Error Code"
                },
                ccdTemp:{

                },
            }

        },
        image: null,
        graph:null,
        status: null,

    },
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
            General: {
                unix: {
                    data: null,
                    title: "Unix Time"
                },
                date: {
                    data: null,
                    title: "Date"
                },
                time:{
                    data: null,
                    title: "Time"
                },
                daemon: {
                    data: null,
                    title: "Daemon State"
                },
                
            },
            State: {
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
            Temperature: {
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
                path:"./data/cat.jpg",
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