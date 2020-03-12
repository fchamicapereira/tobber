"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoreRules_1 = require("./scoreRules");
const tobber_engine_1 = require("./tobber_engine");
const engine = new tobber_engine_1.default();
function optValidator(opt) {
    const SKIP = [];
    const ANIME = false;
    const LIMIT = -1;
    const GETRAW = false;
    const SORT = true;
    if (opt === undefined) {
        return {
            skip: SKIP,
            anime: ANIME,
            limit: LIMIT,
            getRaw: GETRAW,
            sort: SORT,
            rules: scoreRules_1.scoreRules,
        };
    }
    opt.skip = opt.skip !== undefined ? opt.skip : SKIP;
    opt.anime = opt.anime !== undefined ? opt.anime : ANIME;
    opt.limit = opt.limit !== undefined ? opt.limit : LIMIT;
    opt.getRaw = opt.getRaw !== undefined ? opt.getRaw : GETRAW;
    opt.sort = opt.sort !== undefined ? opt.sort : SORT;
    opt.rules = opt.rules !== undefined ? opt.rules : scoreRules_1.scoreRules;
    return opt;
}
async function crawl(search, opt) {
    let options;
    options = optValidator(opt);
    return engine.crawl(search, options);
}
exports.crawl = crawl;
function getSites() {
    return engine.getSites();
}
exports.getSites = getSites;
function getTorrentFromURL(url) {
    return engine.getTorrentFromURL(url);
}
exports.getTorrentFromURL = getTorrentFromURL;
function getScoreRules() {
    return scoreRules_1.scoreRules;
}
exports.getScoreRules = getScoreRules;
//# sourceMappingURL=index.js.map