"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreRules = {
    resolution: [
        {
            key: "2160p",
            keywords: ["uhd", "4k", "2160", "2160p", "3840x2160"],
            score: 1,
        },
        {
            key: "1080p",
            keywords: ["1080", "1080p", "1920x1080"],
            score: 1.2,
        },
        {
            key: "720p",
            keywords: ["720", "720p", "1280x720"],
            score: 1.5,
        },
        {
            key: "480p",
            keywords: ["480", "480p"],
            score: 0.5,
        },
    ],
    source: [
        {
            key: "Remux",
            keywords: ["remux"],
            score: 2,
        },
        {
            key: "Bluray",
            keywords: ["bluray", "blu ray", "bdrip", "bd rip", "brrip", "bd"],
            score: 1.5,
        },
        {
            key: "Web-dl",
            keywords: ["webdl", "web dl"],
            score: 1.3,
        },
        {
            key: "Webrip",
            keywords: ["webrip", "web rip"],
            score: 1.1,
        },
        {
            key: "HDTV",
            keywords: ["hdtv"],
            score: 0.5,
        },
        {
            key: "CAM",
            keywords: ["cam"],
            score: 0.01,
        },
        {
            key: "TS",
            keywords: ["ts", "hdts", "hd ts"],
            score: 0.01,
        },
    ],
    audio: [
        {
            key: "FLAC",
            keywords: ["flac"],
            score: 2,
        },
        {
            key: "AAC",
            keywords: ["aac"],
            score: 1,
        },
        {
            key: "DTS-HD",
            keywords: ["dts-hd", "dts hd", "dts"],
            score: 2,
        },
        {
            key: "DD",
            keywords: ["dd 5 1", "ac3", "dd", "dd5 1"],
            score: 2,
        },
    ],
    encoding: [
        {
            key: "HEVC",
            keywords: ["x265", "hevc", "h265", "h 265"],
            score: 4,
        },
        {
            key: "h264",
            keywords: ["x264", "h264", "h 264", "avc", "mpeg4", "mpeg 4"],
            score: 1,
        },
        {
            key: "h262",
            keywords: ["h262", "h 262", "mpeg2", "mpeg 2"],
            score: 0.5,
        },
        {
            key: "DivX",
            keywords: ["divx"],
            score: 0.2,
        },
        {
            key: "XviD",
            keywords: ["xvid"],
            score: 0.2,
        },
    ],
    group: [
        {
            key: "PublicHD",
            keywords: ["publichd"],
            score: 1,
        },
        {
            key: "SPARKS",
            keywords: ["sparks"],
            score: 1,
        },
        {
            key: "Yify",
            keywords: ["yify"],
            score: 0.1,
        },
        {
            key: "Grym",
            keywords: ["grym"],
            score: 1,
        },
        {
            key: "CtrlHD",
            keywords: ["ctrlhd"],
            score: 1,
        },
        {
            key: "Axxo",
            keywords: ["axxo"],
            score: 1,
        },
        {
            key: "VietHD",
            keywords: ["viethd"],
            score: 1,
        },
        {
            key: "TayTO",
            keywords: ["tayto"],
            score: 1,
        },
        {
            key: "EbP",
            keywords: ["ebp"],
            score: 1,
        },
        {
            key: "ESiR",
            keywords: ["esir"],
            score: 1,
        },
        {
            key: "DON",
            keywords: ["don"],
            score: 1,
        },
        {
            key: "NTb",
            keywords: ["ntb"],
            score: 1,
        },
        {
            key: "IDE",
            keywords: ["ide"],
            score: 1,
        },
        {
            key: "EA",
            keywords: ["ea"],
            score: 1,
        },
        {
            key: "HaB",
            keywords: ["hab"],
            score: 1,
        },
        {
            key: "CRiSC",
            keywords: ["crisc"],
            score: 1,
        },
        {
            key: "BMF",
            keywords: ["bmf"],
            score: 1,
        },
        {
            key: "SA89",
            keywords: ["sa89"],
            score: 1,
        },
        {
            key: "CRiME",
            keywords: ["crime"],
            score: 1,
        },
        {
            key: "RightSiZE",
            keywords: ["rightsize"],
            score: 1,
        },
        {
            key: "HorribleSubs",
            keywords: ["horriblesubs"],
            score: 1,
        },
    ],
    format: [
        {
            key: "mkv",
            keywords: ["mkv"],
            score: 1,
        },
        {
            key: "mp4",
            keywords: ["mp4"],
            score: 0.1,
        },
    ],
    bonus: [
        {
            key: "HDR",
            keywords: ["hdr"],
            score: 8,
        },
    ],
};
//# sourceMappingURL=scoreRules.js.map