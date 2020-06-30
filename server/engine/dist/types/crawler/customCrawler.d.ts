import { Info, Options, ResponseFromCrawler, Site } from "dataTypes";
export default class CustomCrawler {
    private crawler;
    constructor();
    getSites(): Site[];
    crawl(search: string, cb: (results: ResponseFromCrawler) => void, opt: Options): number;
    getInfo(url: string, cb: (results: Info) => void): void;
    private seasonQuery(season);
    private seasonAndEpQuery(season, episode);
    private episodeQuery(episode);
    private appendToOpt(opt, obj);
    private generateInternalOpts(search, opt);
}
