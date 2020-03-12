import { DefaultRules, InternalOptions, Response, ResponseFromCrawler, Torrent } from "dataTypes";
import filter from "./filter";
import prop from "./properties";
import score from "./score";

export default function pipeline(fromCrawler: ResponseFromCrawler): Torrent[] {
  if (fromCrawler.options.getRaw) {
    return fromCrawler.data;
  }

  if (!fromCrawler.data.length) {
    return fromCrawler.data;
  }

  // filtering the data by removing all torrents that
  // don't match the searched query
  fromCrawler.data = filter(fromCrawler);

  fromCrawler.data.forEach((torrent: Torrent) => {
    torrent.properties = prop(torrent, fromCrawler.options.rules);
    torrent.score = score(torrent, fromCrawler.options);
  });

  return fromCrawler.data;
}
