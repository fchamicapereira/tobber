import { DefaultRules, Info, Options, Response, Rules, Site } from "dataTypes";
import { scoreRules } from "./scoreRules";
import Engine from "./tobber_engine";

const engine = new Engine();

function optValidator(opt: Options | undefined): Options {
  const SKIP: string[] = [];
  const ANIME: boolean = false;
  const LIMIT: number = -1;
  const GETRAW: boolean = false;
  const SORT: boolean = true;

  if (opt === undefined) {
    return {
      skip: SKIP,
      anime: ANIME,
      limit: LIMIT,
      getRaw: GETRAW,
      sort: SORT,
      rules: scoreRules,
    };
  }

  opt.skip = opt.skip !== undefined ? opt.skip : SKIP;
  opt.anime = opt.anime !== undefined ? opt.anime : ANIME;
  opt.limit = opt.limit !== undefined ? opt.limit : LIMIT;
  opt.getRaw = opt.getRaw !== undefined ? opt.getRaw : GETRAW;
  opt.sort = opt.sort !== undefined ? opt.sort : SORT;
  opt.rules = opt.rules !== undefined ? opt.rules : scoreRules;

  return opt;
}

export async function crawl(
  search: string,
  opt?: Options,
): Promise<Response> {
  let options: Options;

  options = optValidator(opt);
  return engine.crawl(search, options);
}

export function getSites(): Site[] {
  return engine.getSites();
}

export function getTorrentFromURL(
  url: string,
): Promise<Info> {
  return engine.getTorrentFromURL(url);
}

export function getScoreRules(): DefaultRules {
  return scoreRules;
}
