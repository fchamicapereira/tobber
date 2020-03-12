"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Super class of the spiders
 */
class Spider {
    static initializeTorrent(name, identifier) {
        return {
            id: `${name}_${identifier}_${new Date().getTime()}`,
            site: name,
        };
    }
    static initializeInfo(name) {
        return {
            site: name,
        };
    }
    constructor(name, uri, anime) {
        this.name = name;
        this.uri = uri;
        this.anime = anime;
    }
    /* will return an object to be used in the crawler */
    getCrawlerOptions(search, htmlProcessor, cb, opt) {
        return {
            name: this.name,
            processHTML: htmlProcessor,
            uri: this.searchQuery(search, opt),
            url: this.uri,
            callback(error, res, done) {
                const $ = res.$;
                let response = {
                    data: [],
                    status: {
                        site: this.name,
                        status: error ? error.message : "done",
                        uri: this.uri,
                    },
                    options: opt,
                };
                if (error === null && this.processHTML !== undefined) {
                    response.data = this.processHTML($);
                }
                if (response.data.length === 0) {
                    response.status.status = "empty data";
                }
                cb(response);
                done();
            },
        };
    }
    getInfoOptions(url, htmlProcessor, cb) {
        return {
            name: this.name,
            processHTML: htmlProcessor,
            uri: url,
            url: this.uri,
            callback(error, res, done) {
                const $ = res.$;
                let response;
                if (error === null && this.processHTML !== undefined) {
                    response = this.processHTML($);
                    cb(response);
                }
                else {
                    cb({});
                }
                done();
            },
        };
    }
    searchQuery(search, opt) {
        let wantedSearch = (search += " " + opt.epQuery);
        return this.transformQuery(wantedSearch);
    }
}
exports.default = Spider;
//# sourceMappingURL=spider.js.map