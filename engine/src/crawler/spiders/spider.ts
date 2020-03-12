import * as cheerio from "cheerio";
import { Info, InternalOptions, ResponseFromCrawler, Status, Torrent } from "dataTypes";

/*
 * Super class of the spiders
 */
export default abstract class Spider {

  public static initializeTorrent(name: string, identifier: number): Torrent {
    return {
      id: `${name}_${identifier}_${new Date().getTime()}`,
      site: name,
    };
  }

  public static initializeInfo(name: string): Info {
    return {
      site: name,
    };
  }

  public name: string;
  public uri: string;
  public anime: boolean;

  constructor(name: string, uri: string, anime: boolean) {
    this.name = name;
    this.uri = uri;
    this.anime = anime;
  }

  public abstract processHTML($: CheerioStatic): Torrent[];
  public abstract processHTMLforInfo($: CheerioStatic): Info;

  /* will return an object to be used in the crawler */
  public getCrawlerOptions(
    search: string,
    htmlProcessor: (htmlBody: CheerioStatic) => Torrent[],
    cb: (response: ResponseFromCrawler) => void,
    opt: InternalOptions,
  ): CrawlerOptions {
    return {
      name: this.name,
      processHTML: htmlProcessor,
      uri: this.searchQuery(search, opt),
      url: this.uri,

      callback(error: Error, res: any, done: () => void) {
        const $ = res.$;
        let response: ResponseFromCrawler = {
          data: [] as Torrent[],
          status: {
              site: this.name,
              status: error ? error.message : "done",
              uri: this.uri,
            } as Status,
          options: opt,
        };

        if (error === null && this.processHTML !== undefined) {
          response.data = this.processHTML($);
        }

        if (response.data.length === 0) {
          response.status.status = "empty data";
        }

        cb(response);
        done();
      },
    };
  }

  public getInfoOptions(
    url: string,
    htmlProcessor: (htmlBody: CheerioStatic) => Info,
    cb: (response: Info) => void,
  ): CrawlerOptions {
    return {
      name: this.name,
      processHTML: htmlProcessor,
      uri: url,
      url: this.uri,

      callback(error: Error, res: any, done: () => void) {
        const $ = res.$;
        let response: Info;

        if (error === null && this.processHTML !== undefined) {
          response = this.processHTML($);
          cb(response);
        } else {
          cb({} as Info);
        }
        done();
      },
    };
  }

  protected abstract transformQuery(search: string): string;

  private searchQuery(search: string, opt: InternalOptions) {
    let wantedSearch = (search += " " + opt.epQuery);
    return this.transformQuery(wantedSearch);
  }
}
