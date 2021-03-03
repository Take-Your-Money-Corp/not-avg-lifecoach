const { dockStart } = require("@nlpjs/basic");
const { RestConnector } = require("@nlpjs/rest-connector");

(async () => {
    const dock = await dockStart();
    const container = dock.getContainer();
    container.use(RestConnector)
    await container.get('rest').start();
    const nlp = dock.get('nlp');
    await nlp.train();


})();