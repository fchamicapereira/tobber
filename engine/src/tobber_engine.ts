import { Info, Options, Response, ResponseFromCrawler, Site, Status, Torrent } from "dataTypes";
import CustomCrawler from "./crawler/customCrawler";
import pipeline from "./pipeline";

export default class Engine {
  private pendingCrawlers: number = 0;
  private crawler: CustomCrawler;
  private finalResponse: Response = {
    data: [],
    status: [] as Status[],
  };

  constructor() {
    this.crawler = new CustomCrawler();
    this.reset();
  }

  public crawl(
    search: string,
    opt: Options,
  ): Promise<Response> {
    this.reset();

    return new Promise((resolve, reject) => {
      this.pendingCrawlers = this.crawler.crawl(
        search,
        this.wrapper(opt, resolve),
        opt,
      );

      if (!this.pendingCrawlers) {
        resolve(this.finalResponse);
      }
    });
  }

  public getSites(): Site[] {
    return this.crawler.getSites();
  }

  public getTorrentFromURL(url: string): Promise<Info> {
    return new Promise((resolve, reject) => {
      this.crawler.getInfo(url, resolve);
    });
  }

  private reset() {
    this.pendingCrawlers = -1;
    this.finalResponse = {
      data: [],
      status: [] as Status[],
    };
  }

  /* --- helpers --- */
  private appendResponse(fromCrawler: ResponseFromCrawler, result: Response): Response {
    result.data = result.data.concat(fromCrawler.data);
    result.status = result.status.concat(
      fromCrawler.status,
    ) as Response["status"];

    return result;
  }

  private sortData(data: Torrent[]) {
    data.sort((a: Torrent, b: Torrent) => {
      return a.score === undefined || b.score === undefined
        ? 0
        : b.score - a.score;
    });
    return data;
  }

  private wrapper(
    opt: Options,
    resolve: any,
  ) {
    return (fromCrawler: ResponseFromCrawler) => {
      fromCrawler.data = pipeline(fromCrawler);
      this.finalResponse = this.appendResponse(fromCrawler, this.finalResponse);

      // waiting for all the crawlers to finish
      if (--this.pendingCrawlers !== 0) {
        return;
      }

      this.finalResponse.data =
        opt.sort && !opt.getRaw
          ? this.sortData(this.finalResponse.data)
          : this.finalResponse.data;

      this.finalResponse.data = opt.limit
        ? this.finalResponse.data.slice(0, opt.limit)
        : this.finalResponse.data;

      resolve(this.finalResponse);
    };
  }
}
