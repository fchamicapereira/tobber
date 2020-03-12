import * as cheerio from "cheerio";
import { Info, Torrent } from "dataTypes";
import Spider from "../spider";

export class Nyaa extends Spider {
  constructor() {
    super("nyaa", "https://nyaa.si", true);
  }

  public processHTML($: CheerioStatic): Torrent[] {
    const torrents = [] as Torrent[];
    const URI = this.uri;
    const NAME = this.name;

    $(".torrent-list tbody tr").each((i, el) => {
      let torrent: Torrent = Spider.initializeTorrent(NAME, i);

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

  public processHTMLforInfo($: CheerioStatic): Info {
    return Spider.initializeInfo(this.name);
  }

  protected transformQuery(search: string): string {
    return `${this.uri}/?f=0&c=1_2&q=${search.replace(/ /g, "+")}`;
  }
}
