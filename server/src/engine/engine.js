const engine = require('tobber-engine');

module.exports.getSites = engine.getSites;
module.exports.getScoreRules = engine.getScoreRules;

module.exports.crawl = async (search, opt) => {
	return engine.crawl(search, opt);
};

module.exports.getInfo = async (url) => {
	return engine.getTorrentFromURL(url);
};