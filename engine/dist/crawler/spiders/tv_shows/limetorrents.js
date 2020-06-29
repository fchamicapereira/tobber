"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider_1 = require("../spider");
const URI = "https://www.limetorrents.info";
class Limetorrents extends spider_1.default {
    constructor() {
        super("limetorrents", URI, false);
    }
    processHTML($) {
        let torrents = [];
        const NAME = this.name;
        $("table.table2 tr").each((i, el) => {
            let torrent;
            let row = $(el);
            if (i === 0) {
                return;
            }
            torrent = spider_1.default.initializeTorrent(NAME, i);
            row.find("td").each((ii, el2) => {
                let col = $(el2);
                switch (ii) {
                    case 0:
                        torrent.title = col.text();
                        col.find("a").each((iii, el3) => {
                            let anchor = $(el3);
                            if (iii === 0) {
                                torrent.torrent = anchor.attr("href");
                            }
                            if (iii === 1) {
                                torrent.href = URI + anchor.attr("href");
                            }
                        });
                        break;
                    case 1:
                        break;
                    case 2:
                        torrent.size = col.text();
                        break;
                    case 3:
                        torrent.seeders = parseInt(col.text(), 10);
                        break;
                    case 4:
                        torrent.leechers = parseInt(col.text(), 10);
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
        let downloads = $("table .dltorrent .csprite_dltorrent");
        info.torrent = downloads[0].attribs.href;
        info.magnet = downloads[2].attribs.href;
        let seeders = $("#content span.greenish").html();
        if (seeders) {
            const s = seeders.split(" : ");
            if (s.length >= 2) {
                info.seeders = +s[1];
            }
        }
        let leechers = $("#content span.reddish").html();
        if (leechers) {
            const s = leechers.split(" : ");
            if (s.length >= 2) {
                info.leechers = +s[1];
            }
        }
        return info;
    }
    transformQuery(search) {
        return `${this.uri}/search/all/${search.replace(/ /g, "-")}/`;
    }
}
exports.Limetorrents = Limetorrents;
//# sourceMappingURL=limetorrents.js.map