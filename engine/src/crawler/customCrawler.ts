import Crawler = require("crawler");
import { Info, InternalOptions, Options, Response, ResponseFromCrawler, Site } from "dataTypes";
import Spider from "./spiders/spider";
import {
  filterByAnime,
  filterBySkip,
  filterByTvShow,
  filterByURL,
  getSpiders,
  getSpidersName,
} from "./spiders/spiderNest";

export default class CustomCrawler {
  private crawler: Crawler;

  constructor() {
    this.crawler = new Crawler({
      maxConnections: 10,
      userAgent: "Mozilla/5.0 (Windows NT 6.2; Win64; x64)",
      timeout: 4000, // 4 seconds
      retries: 0,
    });
  }

  public getSites(): Site[] {
    return getSpidersName();
  }

  public crawl(search: string, cb: (results: ResponseFromCrawler) => void, opt: Options): number {
    let spiders: Spider[] = [];
    let opts: InternalOptions[] = [];
    let crawlerOptions: any[] = [];

    spiders = opt.anime ? filterByAnime() : filterByTvShow();

    if (opt.skip) {
      spiders = filterBySkip(opt.skip, spiders);
    }

    opts = this.generateInternalOpts(search, opt);

    spiders.forEach((spider: Spider) => {
      opts.forEach((optsItem: InternalOptions) => {
        crawlerOptions.push(
          spider.getCrawlerOptions(search, spider.processHTML, cb, optsItem),
        );
      });
    });

    this.crawler.queue(crawlerOptions);

    return crawlerOptions.length;
  }

  public getInfo(url: string, cb: (results: Info) => void): void {
    const wantedCrawler: Spider | null = filterByURL(url);

    if (wantedCrawler === null) {
      return cb({} as Info);
    }

    const spider = wantedCrawler.getInfoOptions(url, wantedCrawler.processHTMLforInfo, cb);

    this.crawler.queue(spider);
  }

  private seasonQuery(season: number): string[] {
    let queries: string[] = [];
    queries.push(`season ${season}`);
    queries.push(season < 10 ? `s0${season}` : `s${season}`);
    return queries;
  }

  private seasonAndEpQuery(season: number, episode: number): string {
    const s: string = season < 10 ? `0${season}` : season.toString();
    const e: string = episode < 10 ? `0${episode}` : episode.toString();
    let query: string = `s${s}e${e}`;
    return query;
  }

  private episodeQuery(episode: number): string {
    return `episode ${episode}`;
  }

  private appendToOpt(
    opt: Options,
    obj: { search: string; epQuery?: string },
  ): InternalOptions {
    let newOpt: InternalOptions = {} as InternalOptions;
    Object.assign(newOpt, opt, obj);
    return newOpt;
  }

  private generateInternalOpts(
    search: string,
    opt: Options,
  ): InternalOptions[] {
    let opts: InternalOptions[] = [];

    if (opt.season && !opt.episode) {
      this.seasonQuery(opt.season).forEach((query: string) => {
        opts.push(
          this.appendToOpt(opt, {
            search,
            epQuery: query,
          }),
        );
      });
    } else if (opt.season && opt.episode) {
      opts.push(
        this.appendToOpt(opt, {
          search,
          epQuery: this.seasonAndEpQuery(opt.season, opt.episode),
        }),
      );
    } else if (!opt.season && opt.episode) {
      opts.push(
        this.appendToOpt(opt, {
          search,
          epQuery: `episode ${opt.episode}`,
        }),
      );
    } else {
      opts.push(
        this.appendToOpt(opt, {
          search,
          epQuery: "",
        }),
      );
    }

    return opts;
  }
}
