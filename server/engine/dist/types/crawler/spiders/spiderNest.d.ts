import { Site } from "dataTypes";
import Spider from "./spider";
export declare function getSpiders(): Spider[];
export declare function getSpidersName(): Site[];
export declare function filterBySkip(skip: string[], spiders?: Spider[]): Spider[];
export declare function filterByAnime(spiders?: Spider[]): Spider[];
export declare function filterByTvShow(spiders?: Spider[]): Spider[];
export declare function filterByURL(url: string, spiders?: Spider[]): Spider | null;
