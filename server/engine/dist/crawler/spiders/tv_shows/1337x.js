"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider_1 = require("../spider");
const URI = "https://1337x.to";
// tslint:disable-next-line:class-name
class _1337x extends spider_1.default {
    constructor() {
        super("1337x", URI, false);
    }
    processHTML($) {
        let torrents = [];
        const NAME = this.name;
        $("table.table-list tr").each((i, el) => {
            let torrent = spider_1.default.initializeTorrent(NAME, i);
            let row = $(el);
            row.find("td").each((ii, el2) => {
                let col = $(el2);
                switch (ii) {
                    case 0:
                        const a = col.find("a").next();
                        torrent.title = a.text();
                        torrent.href = URI + a.attr("href");
                        break;
                    case 1:
                        torrent.seeders = parseInt(col.text(), 10);
                        break;
                    case 2:
                        torrent.leechers = parseInt(col.text(), 10);
                        break;
                    case 3:
                        break;
                    case 4:
                        torrent.size = col
                            .children()
                            .remove()
                            .end()
                            .text();
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
        info.magnet = $("ul.download-links-dontblock a.caebdbea").attr("href");
        info.torrent = $("ul.download-links-dontblock li.dropdown ul.dropdown-menu li a").attr("href");
        let seeders = $(".seeds").html();
        if (seeders) {
            info.seeders = +seeders;
        }
        let leechers = $(".leeches").html();
        if (leechers) {
            info.leechers = +leechers;
        }
        return info;
    }
    transformQuery(search) {
        return `${this.uri}/search/${search.replace(/ /g, "+")}/1/`;
    }
}
exports._1337x = _1337x;
//# sourceMappingURL=1337x.js.map