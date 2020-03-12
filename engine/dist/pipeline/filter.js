"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filter(fromCrawler) {
    return fromCrawler.data.filter((torrent) => {
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
exports.default = filter;
//# sourceMappingURL=filter.js.map