"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function searchForProperty(title, rules) {
    let match = null;
    rules.forEach((rule) => {
        let keywords = rule.keywords;
        for (let word of keywords) {
            if (` ${title} `.includes(` ${word} `)) {
                match = rule.key;
                return;
            }
        }
    });
    return match;
}
function properties(torrent, rules) {
    if (!torrent.title) {
        return {};
    }
    let keys = Object.keys(rules);
    let prop = {};
    let title = torrent.title.toLowerCase().replace(/%20|_|\.|\+|\(|\)|\[|\]|-/g, " ");
    keys.forEach((key) => {
        const match = searchForProperty(title, rules[key]);
        if (match !== null) {
            prop[key] = match;
        }
    });
    return prop;
}
exports.default = properties;
//# sourceMappingURL=properties.js.map