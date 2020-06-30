"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider_1 = require("../spider");
const URI = "https://rarbg.is";
class Rarbg extends spider_1.default {
    constructor() {
        super("rarbg", URI, false);
    }
    processHTML($) {
        const torrents = [];
        const NAME = this.name;
        $(".lista2t tr").each((i, el) => {
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
                        break;
                    case 1:
                        let a = col.find("a").first();
                        torrent.title = a.text();
                        torrent.href = URI + a.attr("href");
                        break;
                    case 2:
                        break;
                    case 3:
                        let size = col.text();
                        if (size.length !== 0) {
                            torrent.size = size;
                        }
                        break;
                    case 4:
                        torrent.seeders = parseInt(col.text(), 10);
                        break;
                    case 5:
                        torrent.leechers = parseInt(col.text(), 10);
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
        return `${this.uri}/torrents.php?search=${search.replace(/ /g, "+")}`;
    }
}
exports.Rarbg = Rarbg;
//# sourceMappingURL=rarbg.js.map