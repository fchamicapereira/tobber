import * as cheerio from "cheerio";
import { Info, Torrent } from "dataTypes";
import Spider from "../spider";

const URI = "https://rarbg.is";

export class Rarbg extends Spider {
  constructor() {
    super("rarbg", URI, false);
  }

  public processHTML($: CheerioStatic): Torrent[] {
    const torrents = [] as Torrent[];
    const NAME = this.name;

    $(".lista2t tr").each((i, el) => {
      let torrent: Torrent;
      let row = $(el);
      if (i === 0) {
        return;
      }

      torrent = Spider.initializeTorrent(NAME, i);

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

  public processHTMLforInfo($: CheerioStatic): Info {
    return Spider.initializeInfo(this.name);
  }

  protected transformQuery(search: string): string {
    return `${this.uri}/torrents.php?search=${search.replace(/ /g, "+")}`;
  }
}
