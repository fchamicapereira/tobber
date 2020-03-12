export class Torrent {
    id: string;
    site: string;
    href: string;

    title?: string;
    seeders?: number;
    leechers?: number;
    size?: string;
    magnet?: string;
    torrent?: string;

    properties?: { [key: string]: string; };
    score?: number;

    info: {
        season?: {
            begin: number,
            end: number
        },
        episode?: number
    };
}
