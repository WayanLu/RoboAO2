const Helper = require("../helper")
const CONFIG = require("../config");



describe(`
//////////////////////////////////////////////////////////////////////
///            helper.js
//////////////////////////////////////////////////////////////////////

`, () => {
    
    
    // If you want to make tests for individual components, uncomment below
    test.each(Object.entries(CONFIG))("getGraphData() -> %s", (component, config) => {
        const graph = Helper.getGraphData(config.graph)

        const data = graph.data.datasets[0].data
        
        expect(data).not.toEqual([])
    })
});