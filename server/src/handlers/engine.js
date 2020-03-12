const Boom = require('boom');

module.exports.getRules = async (request) => {
	try {
		const rules = await request.server.methods.engine.getScoreRules();
		return rules === null ? Boom.badData('No rules found') : rules;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.getSites = async (request) => {
	try {
		return await request.server.methods.engine.getSites();
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.crawl = async (request) => {
	const name = request.auth.credentials.name;
	const search = request.params.search;
	let opt = request.pre.opt;
	
	try {
		const user = await request.server.methods.user.getByName(name);
		const rules = user.rules;
		
		if (opt !== null) {
			opt.rules = rules;
		} else {
			opt = { rules: rules };
		}

		let results = await request.server.methods.engine.crawl(search, opt);

		request.server.methods.user.updateTop(name, results.data);

		return results;
	} catch (e) {
		return Boom.boomify(e);
	}
};

module.exports.getInfo = async (request) => {
	const url = request.payload.url;

	try {
		return await request.server.methods.engine.getInfo(url);
	} catch (e) {
		return Boom.boomify(e);
	}
};