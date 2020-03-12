import * as cheerio from "cheerio";
import { Info, Torrent } from "dataTypes";
import Spider from "../spider";

const URI = "https://1337x.to";

// tslint:disable-next-line:class-name
export class _1337x extends Spider {
  constructor() {
    super("1337x", URI, false);
  }

  public processHTML($: CheerioStatic): Torrent[] {
    let torrents = [] as Torrent[];
    const NAME = this.name;

    $("table.table-list tr").each((i, el) => {
      let torrent: Torrent = Spider.initializeTorrent(NAME, i);
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

  public processHTMLforInfo($: CheerioStatic): Info {
    let info = Spider.initializeInfo(this.name);

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

  protected transformQuery(search: string): string {
    return `${this.uri}/search/${search.replace(/ /g, "+")}/1/`;
  }
}
