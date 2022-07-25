const Helper = require("../helper")
const CONFIG = require("../config");



describe(`
//////////////////////////////////////////////////////////////////////
///            helper.js
//////////////////////////////////////////////////////////////////////

`, () => {
    test.each(Object.entries(CONFIG))("getGraphData() -> %s", (component, config) => {
        const graph = Helper.getGraphData(config.graph)

        const data = graph.data.datasets[0].data
        
        expect(data).not.toEqual([])
    })
});