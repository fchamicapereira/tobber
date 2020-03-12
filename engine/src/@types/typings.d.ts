declare module "dataTypes" {
    export interface Options {
        episode?: number;
        season?: number;
        skip?: string[];
        anime?: boolean;
        sort: boolean;
        limit: number;
        getRaw: boolean;
        rules?: Rules;
        imdb?: {
          api_key: string,
        };
        mal?: {
          user: string
          pass: string,
        };
      }

    export interface InternalOptions extends Options {
        search: string;
        epQuery: string;
        rules: Rules;
    }

    export interface Status {
        site: string;
        status: string;
        uri: string;
    }

    export interface Response {
        status: Status[];
        data: Torrent[];
    }

    export interface ResponseFromCrawler {
        status: Status;
        data: Torrent[];
        options: InternalOptions;
    }

    export interface Site {
        name: string;
        url: string;
    }

    export interface Rule {
        key: string;
        keywords: string[];
        score: number;
    }

    export interface DefaultRules {
        resolution: Rule[];
        source: Rule[];
        audio: Rule[];
        encoding: Rule[];
        group: Rule[];
        format: Rule[];
        bonus: Rule[];
        [key: string]: Rule[];
    }

    export interface Rules {
        [key: string]: Rule[];
    }

    export interface Properties {
        [key: string]: string;
    }

    export interface Torrent {
        id: string;
        site: string;
        title?: string;
        href?: string;

        seeders?: number;
        leechers?: number;
        size?: string;
        magnet?: string;
        torrent?: string;

        properties?: Properties;
        score?: number;
    }

    export interface Info {
        site: string;

        seeders?: number;
        leechers?: number;

        magnet?: string;
        torrent?: string;

        files?: string;
    }
}
