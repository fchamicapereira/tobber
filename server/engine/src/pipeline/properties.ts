import { DefaultRules, Properties, Rule, Rules, Torrent } from "dataTypes";

function searchForProperty(title: string, rules: Rule[]): string | null {
  let match: string | null = null;

  rules.forEach((rule: Rule) => {
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

export default function properties(torrent: Torrent, rules: Rules): Properties {
  if (!torrent.title) {
    return {} as Properties;
  }

  let keys = Object.keys(rules);
  let prop: Properties = {} as Properties;
  let title = torrent.title.toLowerCase().replace(/%20|_|\.|\+|\(|\)|\[|\]|-/g, " ");

  keys.forEach((key: string) => {
    const match = searchForProperty(title, rules[key]);
    if (match !== null) {
      prop[key] = match;
    }
  });

  return prop;
}
