const Utils = require("../utils")
const CONFIG = require("../config");

describe(`
//////////////////////////////////////////////////////////////////////
///            utils.js
//////////////////////////////////////////////////////////////////////

`, () => {
    
    
    test.each(Object.entries(CONFIG))("getData() -> %s", (component, config) => {
        const newConfig = Utils.getData(config)
        const telemetry = newConfig.telemetry
        const image = newConfig.image
        const graph = newConfig.graph
       
       
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

    
    
    })
    
 

});