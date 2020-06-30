import { Info, Options, Response, Site } from "dataTypes";
export default class Engine {
    private pendingCrawlers;
    private crawler;
    private finalResponse;
    constructor();
    crawl(search: string, opt: Options): Promise<Response>;
    getSites(): Site[];
    getTorrentFromURL(url: string): Promise<Info>;
    private reset();
    private appendResponse(fromCrawler, result);
    private sortData(data);
    private wrapper(opt, resolve);
}
