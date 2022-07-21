const Utils = require("../utils")
const CONFIG = require("../config");

describe(`
//////////////////////////////////////////////////////////////////////
///            utils.js
//////////////////////////////////////////////////////////////////////

`, () => {
    
    
    
    
    test("VICD getData() Telemetry Data Success", () => {
        const config = Utils.getData(CONFIG.vicd)
        const telemetry = config.telemetry
        const image = config.image
        const graph = config.graph 

        //telemetry
        for(const [groupName, content] of Object.entries(telemetry)){
            for (const [dataEntry, dataContent] of Object.entries(content)){
                const data = dataContent.data
                const title = dataContent.title
                expect(data).not.toBeNull()
            }
        }

        //image
        for(imageObject of image){
            const buffer = imageObject.imageBuffer
            expect(buffer).not.toBeNull()
        }

        //graph
        const data = graph.data.datasets[0].data
        expect(data).not.toEqual([])
    }); 


});