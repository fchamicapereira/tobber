/// <reference types="cheerio" />
import { Info, InternalOptions, ResponseFromCrawler, Torrent } from "dataTypes";
export default abstract class Spider {
    static initializeTorrent(name: string, identifier: number): Torrent;
    static initializeInfo(name: string): Info;
    name: string;
    uri: string;
    anime: boolean;
    constructor(name: string, uri: string, anime: boolean);
    abstract processHTML($: CheerioStatic): Torrent[];
    abstract processHTMLforInfo($: CheerioStatic): Info;
    getCrawlerOptions(search: string, htmlProcessor: (htmlBody: CheerioStatic) => Torrent[], cb: (response: ResponseFromCrawler) => void, opt: InternalOptions): CrawlerOptions;
    getInfoOptions(url: string, htmlProcessor: (htmlBody: CheerioStatic) => Info, cb: (response: Info) => void): CrawlerOptions;
    protected abstract transformQuery(search: string): string;
    private searchQuery(search, opt);
}
