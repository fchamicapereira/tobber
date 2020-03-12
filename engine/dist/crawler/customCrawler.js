"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crawler = require("crawler");
const spiderNest_1 = require("./spiders/spiderNest");
class CustomCrawler {
    constructor() {
        this.crawler = new Crawler({
            maxConnections: 10,
            userAgent: "Mozilla/5.0 (Windows NT 6.2; Win64; x64)",
            timeout: 4000,
            retries: 0,
        });
    }
    getSites() {
        return spiderNest_1.getSpidersName();
    }
    crawl(search, cb, opt) {
        let spiders = [];
        let opts = [];
        let crawlerOptions = [];
        spiders = opt.anime ? spiderNest_1.filterByAnime() : spiderNest_1.filterByTvShow();
        if (opt.skip) {
            spiders = spiderNest_1.filterBySkip(opt.skip, spiders);
        }
        opts = this.generateInternalOpts(search, opt);
        spiders.forEach((spider) => {
            opts.forEach((optsItem) => {
                crawlerOptions.push(spider.getCrawlerOptions(search, spider.processHTML, cb, optsItem));
            });
        });
        this.crawler.queue(crawlerOptions);
        return crawlerOptions.length;
    }
    getInfo(url, cb) {
        const wantedCrawler = spiderNest_1.filterByURL(url);
        if (wantedCrawler === null) {
            return cb({});
        }
        const spider = wantedCrawler.getInfoOptions(url, wantedCrawler.processHTMLforInfo, cb);
        this.crawler.queue(spider);
    }
    seasonQuery(season) {
        let queries = [];
        queries.push(`season ${season}`);
        queries.push(season < 10 ? `s0${season}` : `s${season}`);
        return queries;
    }
    seasonAndEpQuery(season, episode) {
        const s = season < 10 ? `0${season}` : season.toString();
        const e = episode < 10 ? `0${episode}` : episode.toString();
        let query = `s${s}e${e}`;
        return query;
    }
    episodeQuery(episode) {
        return `episode ${episode}`;
    }
    appendToOpt(opt, obj) {
        let newOpt = {};
        Object.assign(newOpt, opt, obj);
        return newOpt;
    }
    generateInternalOpts(search, opt) {
        let opts = [];
        if (opt.season && !opt.episode) {
            this.seasonQuery(opt.season).forEach((query) => {
                opts.push(this.appendToOpt(opt, {
                    search,
                    epQuery: query,
                }));
            });
        }
        else if (opt.season && opt.episode) {
            opts.push(this.appendToOpt(opt, {
                search,
                epQuery: this.seasonAndEpQuery(opt.season, opt.episode),
            }));
        }
        else if (!opt.season && opt.episode) {
            opts.push(this.appendToOpt(opt, {
                search,
                epQuery: `episode ${opt.episode}`,
            }));
        }
        else {
            opts.push(this.appendToOpt(opt, {
                search,
                epQuery: "",
            }));
        }
        return opts;
    }
}
exports.default = CustomCrawler;
//# sourceMappingURL=customCrawler.js.map