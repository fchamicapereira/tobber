"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversionTable = {
    gib: Math.pow(2, 30),
    gb: 1e9,
    mib: Math.pow(2, 20),
    mb: 1e6,
    kib: Math.pow(2, 10),
    kb: 1e3,
};
function sizeToBytes(size) {
    let splitted;
    let bytes;
    let unity;
    let multipliers;
    if (!size) {
        return 0;
    }
    // '12.2 Gb' -> ['12.2', 'Gb']
    splitted = size.toLowerCase().split(" ");
    bytes = parseFloat(splitted[0].replace(/,/g, ""));
    unity = splitted[1];
    multipliers = Object.keys(conversionTable);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < multipliers.length; i++) {
        if (unity.includes(multipliers[i])) {
            return bytes * conversionTable[multipliers[i]];
        }
    }
    return bytes;
}
function getRuleFromRules(rules, property, subproperty) {
    const rulesOfProperty = rules[property];
    for (let rule of rulesOfProperty) {
        if (rule.key === subproperty) {
            return rule;
        }
    }
    return null;
}
function score(torrent, opt) {
    let properties;
    let result;
    if (!torrent.size) {
        return 0;
    }
    properties = torrent.properties || {};
    result = sizeToBytes(torrent.size);
    Object.keys(properties).forEach((property) => {
        const subproperty = properties[property];
        const ruleFromOpt = getRuleFromRules(opt.rules, property, subproperty);
        result = ruleFromOpt !== null ? result * ruleFromOpt.score : result;
    });
    return Math.log(result);
}
exports.default = score;
//# sourceMappingURL=score.js.map