"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spider_1 = require("../spider");
const URI = "https://zooqle.com";
class Zooqle extends spider_1.default {
    constructor() {
        super("zooqle", URI, false);
    }
    processHTML($) {
        const torrents = [];
        const NAME = this.name;
        $(".panel-body tr").each((i, el) => {
            let torrent = spider_1.default.initializeTorrent(NAME, i);
            let row = $(el);
            row.find("td").each((ii, el2) => {
                let col = $(el2);
                switch (ii) {
                    case 0:
                        break;
                    case 1:
                        torrent.title = col.text();
                        torrent.href = URI + col.find("a").attr("href");
                        break;
                    case 2:
                        col.find("li a").each((iii, el3) => {
                            let anchor = $(el3);
                            let title = anchor.attr("title");
                            let href = anchor.attr("href");
                            if (title === "Magnet link") {
                                torrent.magnet = href;
                            }
                            else if (title === "Generate .torrent") {
                                torrent.torrent = URI + href;
                            }
                        });
                        break;
                    case 3:
                        let size = col.find("div div").text();
                        if (size.length !== 0) {
                            torrent.size = size;
                        }
                        break;
                    case 4:
                        break;
                    case 5:
                        let peers = col.find("div").attr("title");
                        if (peers === undefined) {
                            break;
                        }
                        let ar = peers.split(" | ");
                        if (ar[0]) {
                            let seeders = ar[0].split("Seeders: ");
                            if (seeders[1]) {
                                torrent.seeders = parseInt(seeders[1], 10);
                            }
                        }
                        if (ar[1]) {
                            let leechers = ar[1].split("Leechers: ");
                            if (leechers[1]) {
                                torrent.leechers = parseInt(leechers[1], 10);
                            }
                        }
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
        let links = $("#torrent ul.nav.nav-pills.nav-stacked.nav-compact");
        $(links).find("li").each((i, el) => {
            switch (i) {
                case 0:
                    break;
                case 1:
                    info.magnet = $(el).find("a").attr("href");
                    break;
                case 2:
                    info.torrent = URI + $(el).find("a").attr("href");
                    break;
            }
        });
        let peers = $("#torinfo div.progress.prog.trans90").attr("title")
            .match(/\d+/g);
        if (peers) {
            info.seeders = +peers[0];
            info.leechers = +peers[1];
        }
        /*
        let files = $("#files table");
    
        info.files = [];
    
        $(files.find("tr")).each(function(i, el) {
          let content = $(el).find("td");
          let title = $(content[0]);
          let size = $(content[1]);
          let margin = parseInt($(title.find("i")[0]).css("margin-left").split("px")[0]);
    
          let file = {
            title: title.text(),
          };
    
          // it's a folder
          if (size.text().length === 0) {
            file.content = [];
            file.margin = margin;
          } else {
            file.size = size.text();
          }
    
          insertFile(info.files, file, margin);
        });
    
        info.files = cleanUpFiles(info.files);
        */
        return info;
    }
    transformQuery(search) {
        return `${this.uri}/search?q=${search.replace(/ /g, "+")}`;
    }
}
exports.Zooqle = Zooqle;
/*
function insertFile(files, file, margin) {
  if (margin === 0 || files.length === 0) {
    files.push(file);
    return;
  }

  let folder = files[files.length - 1].content;
  let folderMargin = files[files.length - 1].margin;

  if (folder === undefined || folderMargin === margin) {
    files.push(file);
    return;
  }

  insertFile(folder, file, margin - folderMargin);
}

function cleanUpFiles(files) {
  let newFiles = [];

  files.forEach((v) => {
    if (v.content !== undefined) {
      newFiles.push({
        title: v.title,
        content: cleanUpFiles(v.content),
      });
    } else {
      newFiles.push(v);
    }
  });

  return newFiles;
}
*/
//# sourceMappingURL=zooqle.js.map