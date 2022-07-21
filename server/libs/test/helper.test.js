const Helper = require("../helper")
const CONFIG = require("../config");



describe(`
//////////////////////////////////////////////////////////////////////
///            helper.js
//////////////////////////////////////////////////////////////////////

`, () => {
    

    // If you want to make tests for individual components, uncomment below

    // test("getGraphData() VICD Success", () => {
    //     const graph = Helper.getGraphData(CONFIG.vicd.graph)

    //     const data = graph.data.datasets[0].data
    //     expect(data).not.toEqual([])
    // })


    // this tests for all components
    test("getGraphData() All Components Success", () => {
        
        for(const [componentName, config] of Object.entries(CONFIG)){
            const graph = Helper.getGraphData(config.graph)
            
            const data = graph.data.datasets[0].data
            expect(data).not.toEqual([])
        }
        
    })

    


});