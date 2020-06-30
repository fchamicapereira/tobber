import { DefaultRules, Info, Options, Response, Site } from "dataTypes";
export declare function crawl(search: string, opt?: Options): Promise<Response>;
export declare function getSites(): Site[];
export declare function getTorrentFromURL(url: string): Promise<Info>;
export declare function getScoreRules(): DefaultRules;
