import { ResponseFromCrawler, Torrent } from "dataTypes";

export default function filter(fromCrawler: ResponseFromCrawler) {
  return fromCrawler.data.filter((torrent: Torrent) => {
    if (!torrent.title) {
      return false;
    }

    let title = torrent.title.toLowerCase();

    // take out the garbage
    title = title.replace(/%20|_|\.|\+|\(|\)|\[|\]|-/g, " ");

    // check if this is the episode we want
    if (!title.includes(fromCrawler.options.epQuery)) {
      return false;
    }

    let searchedWords = fromCrawler.options.search.toLowerCase().split(" ");

    // check if includes all words in search
    for (let word of searchedWords) {
      if (!title.includes(word)) {
        return false;
      }
    }

    return true;
  });
}
