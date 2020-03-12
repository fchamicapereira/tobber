/// <reference types="cheerio" />
import { Info, Torrent } from "dataTypes";
import Spider from "../spider";
export declare class _1337x extends Spider {
    constructor();
    processHTML($: CheerioStatic): Torrent[];
    processHTMLforInfo($: CheerioStatic): Info;
    protected transformQuery(search: string): string;
}
