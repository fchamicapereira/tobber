import { Torrent } from './torrents/torrent';

export class EngineResponse {
    data: Torrent[];
    status: {
        site: string;
        status: string;
        uri: string;
    }[];
    search: string;
}
