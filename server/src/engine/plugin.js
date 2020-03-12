const engine = require('./engine');

module.exports = {
	name: 'engine',
	version: '1.0.0',
	register: async (server) => {

		server.method({
			name: 'engine.crawl',
			method: engine.crawl
		});

		server.method({
			name: 'engine.getSites',
			method: engine.getSites
		});

		server.method({
			name: 'engine.getScoreRules',
			method: engine.getScoreRules
		});

		server.method({
			name: 'engine.getInfo',
			method: engine.getInfo
		});
	}
	
};