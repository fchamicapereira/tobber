import { Site } from "dataTypes";
import { Nyaa } from "./anime/nyaa";
import Spider from "./spider";
import { _1337x } from "./tv_shows/1337x";
import { Limetorrents } from "./tv_shows/limetorrents";
import { Rarbg } from "./tv_shows/rarbg";
import { Thepiratebay } from "./tv_shows/thepiratebay";
import { Zooqle } from "./tv_shows/zooqle";

const allSpiders: Spider[] = [
    new _1337x(),
    new Limetorrents(),
    new Rarbg(),
    new Thepiratebay(),
    new Zooqle(),
    new Nyaa(),
];

export function getSpiders(): Spider[] { return allSpiders; }

export function getSpidersName(): Site[] {
    return allSpiders.reduce((total: Site[], spider: Spider) => {
        total.push({
            name: spider.name,
            url: spider.uri,
        });
        return total;
      }, []);
}

export function filterBySkip(skip: string[], spiders?: Spider[]): Spider[] {
    let s = spiders || allSpiders;

    return s.filter((spider: Spider) => {
        for (let name of skip) {
            if (spider.name === name) {
                return false;
            }
        }
        return true;
    });
}

export function filterByAnime(spiders?: Spider[]): Spider[] {
    let s = spiders || allSpiders;

    return s.filter((spider: Spider) => spider.anime === true);
}

export function filterByTvShow(spiders?: Spider[]): Spider[] {
    let s = spiders || allSpiders;

    return s.filter((spider: Spider) => spider.anime === false);
}

export function filterByURL(url: string, spiders?: Spider[]): Spider | null {
    let s = spiders || allSpiders;

    const c = s.filter((spider: Spider) => url.indexOf(spider.uri) !== -1);
    return c.length > 0 ? c[0] : null;
}
