"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customCrawler_1 = require("./crawler/customCrawler");
const pipeline_1 = require("./pipeline");
class Engine {
    constructor() {
        this.pendingCrawlers = 0;
        this.finalResponse = {
            data: [],
            status: [],
        };
        this.crawler = new customCrawler_1.default();
        this.reset();
    }
    crawl(search, opt) {
        this.reset();
        return new Promise((resolve, reject) => {
            this.pendingCrawlers = this.crawler.crawl(search, this.wrapper(opt, resolve), opt);
            if (!this.pendingCrawlers) {
                resolve(this.finalResponse);
            }
        });
    }
    getSites() {
        return this.crawler.getSites();
    }
    getTorrentFromURL(url) {
        return new Promise((resolve, reject) => {
            this.crawler.getInfo(url, resolve);
        });
    }
    reset() {
        this.pendingCrawlers = -1;
        this.finalResponse = {
            data: [],
            status: [],
        };
    }
    /* --- helpers --- */
    appendResponse(fromCrawler, result) {
        result.data = result.data.concat(fromCrawler.data);
        result.status = result.status.concat(fromCrawler.status);
        return result;
    }
    sortData(data) {
        data.sort((a, b) => {
            return a.score === undefined || b.score === undefined
                ? 0
                : b.score - a.score;
        });
        return data;
    }
    wrapper(opt, resolve) {
        return (fromCrawler) => {
            fromCrawler.data = pipeline_1.default(fromCrawler);
            this.finalResponse = this.appendResponse(fromCrawler, this.finalResponse);
            // waiting for all the crawlers to finish
            if (--this.pendingCrawlers !== 0) {
                return;
            }
            this.finalResponse.data =
                opt.sort && !opt.getRaw
                    ? this.sortData(this.finalResponse.data)
                    : this.finalResponse.data;
            this.finalResponse.data = opt.limit
                ? this.finalResponse.data.slice(0, opt.limit)
                : this.finalResponse.data;
            resolve(this.finalResponse);
        };
    }
}
exports.default = Engine;
//# sourceMappingURL=tobber_engine.js.map