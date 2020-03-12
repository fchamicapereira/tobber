"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nyaa_1 = require("./anime/nyaa");
const _1337x_1 = require("./tv_shows/1337x");
const limetorrents_1 = require("./tv_shows/limetorrents");
const rarbg_1 = require("./tv_shows/rarbg");
const thepiratebay_1 = require("./tv_shows/thepiratebay");
const zooqle_1 = require("./tv_shows/zooqle");
const allSpiders = [
    new _1337x_1._1337x(),
    new limetorrents_1.Limetorrents(),
    new rarbg_1.Rarbg(),
    new thepiratebay_1.Thepiratebay(),
    new zooqle_1.Zooqle(),
    new nyaa_1.Nyaa(),
];
function getSpiders() { return allSpiders; }
exports.getSpiders = getSpiders;
function getSpidersName() {
    return allSpiders.reduce((total, spider) => {
        total.push({
            name: spider.name,
            url: spider.uri,
        });
        return total;
    }, []);
}
exports.getSpidersName = getSpidersName;
function filterBySkip(skip, spiders) {
    let s = spiders || allSpiders;
    return s.filter((spider) => {
        for (let name of skip) {
            if (spider.name === name) {
                return false;
            }
        }
        return true;
    });
}
exports.filterBySkip = filterBySkip;
function filterByAnime(spiders) {
    let s = spiders || allSpiders;
    return s.filter((spider) => spider.anime === true);
}
exports.filterByAnime = filterByAnime;
function filterByTvShow(spiders) {
    let s = spiders || allSpiders;
    return s.filter((spider) => spider.anime === false);
}
exports.filterByTvShow = filterByTvShow;
function filterByURL(url, spiders) {
    let s = spiders || allSpiders;
    const c = s.filter((spider) => url.indexOf(spider.uri) !== -1);
    return c.length > 0 ? c[0] : null;
}
exports.filterByURL = filterByURL;
//# sourceMappingURL=spiderNest.js.map