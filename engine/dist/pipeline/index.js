"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("./filter");
const properties_1 = require("./properties");
const score_1 = require("./score");
function pipeline(fromCrawler) {
    if (fromCrawler.options.getRaw) {
        return fromCrawler.data;
    }
    if (!fromCrawler.data.length) {
        return fromCrawler.data;
    }
    // filtering the data by removing all torrents that
    // don't match the searched query
    fromCrawler.data = filter_1.default(fromCrawler);
    fromCrawler.data.forEach((torrent) => {
        torrent.properties = properties_1.default(torrent, fromCrawler.options.rules);
        torrent.score = score_1.default(torrent, fromCrawler.options);
    });
    return fromCrawler.data;
}
exports.default = pipeline;
//# sourceMappingURL=index.js.map