export interface Options {
    episode?: number;
    season?: number;
    skip?: string[];
    metadata?: boolean;
    anime?: boolean;
    sort?: boolean;
    limit?: number;
    getRaw?: boolean;
    rules?: Rules;
    imdb?: {
        api_key: string;
    };
    mal?: {
        user: string;
        pass: string;
    };
}
export interface InternalOptions extends Options {
    search: string;
    epQuery: string;
}
export interface Status {
    site: string;
    status: string;
    uri: string;
}
export interface Response {
    status: Status[];
    data: Torrent[];
    metadata?: {};
}
export interface Rule {
    key: string;
    keywords: [string];
    score: number;
}
export interface Rules {
    resultion?: [Rule];
    source?: [Rule];
    audio?: [Rule];
    encoding?: [Rule];
    group?: [Rule];
    format?: [Rule];
    bonus?: [Rule];
}
export interface Torrent {
    id: string;
    site: string;
    title: string;
    href: string;
    seeders?: string;
    leechers?: string;
    size?: string;
    magnet?: string;
    torrent?: string;
    properties?: {
        resultion?: string;
        source?: string;
        audio?: string;
        encoding?: string;
        group?: string;
        format?: string;
        bonus?: string;
    };
    score?: number;
}
