import { Torrent } from '../home/torrents/torrent';

export class User {
    name: string;
    pass: string;
    preferences: {
      limit?: number,
      skip?: string[],
      omdb?: boolean,
      sort?: boolean,
      anime?: boolean,
      top?: number
    };
    rules: object;
    token: string;
    scope: string[];
    top: Torrent[];
}
