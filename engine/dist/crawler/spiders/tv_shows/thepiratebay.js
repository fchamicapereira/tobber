"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider_1 = require("../spider");
const URI = "https://piratebays.be/";
class Thepiratebay extends spider_1.default {
    constructor() {
        super("thepiratebay", URI, false);
    }
    processHTML($) {
        const torrents = [];
        const NAME = this.name;
        $("#SearchResults #searchResult tr").each((i, el) => {
            let row = $(el);
            let torrent = spider_1.default.initializeTorrent(NAME, i);
            row.find("td").each((ii, el2) => {
                let col = $(el2);
                switch (ii) {
                    case 0:
                        break;
                    case 1:
                        let a = col.find("a").first();
                        torrent.title = a.text();
                        torrent.href = URI + a.attr("href");
                        let sizeString = col
                            .find("font")
                            .children()
                            .remove()
                            .end()
                            .text();
                        if (sizeString && sizeString.length) {
                            let temp = sizeString
                                .split(", ")[1]
                                .split("Size ")[1];
                            if (temp !== undefined) {
                                torrent.size = temp.replace("\xa0", " ");
                            }
                        }
                        break;
                    case 2:
                        torrent.seeders = parseInt(col.text(), 10);
                        break;
                    case 3:
                        torrent.leechers = parseInt(col.text(), 10);
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    default:
                        break;
                }
            });
            torrents.push(torrent);
        });
        return torrents;
    }
    processHTMLforInfo($) {
        let info = spider_1.default.initializeInfo(this.name);
        let details = $("#details dl.col1");
        let c = details.children();
        let s = false;
        let l = false;
        c.each((i, e) => {
            if (s) {
                s = false;
                info.seeders = +$(e).text();
                return;
            }
            if (l) {
                l = false;
                info.leechers = +$(e).text();
                return;
            }
            if ($(e).text().indexOf("Seeders:") !== -1) {
                s = true;
                return;
            }
            if ($(e).text().indexOf("Leechers:") !== -1) {
                l = true;
                return;
            }
        });
        let download = $("div.download a");
        info.magnet = download.attr("href");
        return info;
    }
    transformQuery(search) {
        return `${this.uri}/s/?q=${search.replace(/ /g, "+")}&page=0&orderby=99`;
    }
}
exports.Thepiratebay = Thepiratebay;
//# sourceMappingURL=thepiratebay.js.map