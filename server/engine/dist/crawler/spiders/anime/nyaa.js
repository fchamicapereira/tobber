"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider_1 = require("../spider");
class Nyaa extends spider_1.default {
    constructor() {
        super("nyaa", "https://nyaa.si", true);
    }
    processHTML($) {
        const torrents = [];
        const URI = this.uri;
        const NAME = this.name;
        $(".torrent-list tbody tr").each((i, el) => {
            let torrent = spider_1.default.initializeTorrent(NAME, i);
            $(el)
                .find("td")
                .each((ii, el2) => {
                let col = $(el2);
                switch (ii) {
                    case 0:
                        break;
                    case 1:
                        let anchors = col.find("a").first();
                        torrent.title = anchors.text();
                        torrent.href = URI + anchors.attr("href");
                        break;
                    case 2:
                        let a = col.find("a");
                        torrent.torrent = URI + a.first().attr("href");
                        torrent.magnet = URI + a.next().attr("href");
                        break;
                    case 3:
                        torrent.size = col.text();
                        break;
                    case 4:
                        break;
                    case 5:
                        torrent.seeders = parseInt(col.text(), 10);
                        break;
                    case 6:
                        torrent.leechers = parseInt(col.text(), 10);
                        break;
                    case 7:
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
        return spider_1.default.initializeInfo(this.name);
    }
    transformQuery(search) {
        return `${this.uri}/?f=0&c=1_2&q=${search.replace(/ /g, "+")}`;
    }
}
exports.Nyaa = Nyaa;
//# sourceMappingURL=nyaa.js.map