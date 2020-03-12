import { Pipe, PipeTransform } from '@angular/core';
import { Torrent } from './torrent';

@Pipe({
  name: 'torrentFilter'
})
export class TorrentFilterPipe implements PipeTransform {

  transform(torrents: Torrent[],
    title: string,
    property: string,
    season: number,
    episode: number,
    ): Torrent[] {

    season = typeof season === 'string' ? +season : season;
    episode = typeof episode === 'string' ? +episode : episode;

    if (property && property.length > 3) {
      torrents = this.filterByPropperties(torrents, property);
    }

    if (title && title.length > 3) {
      torrents = this.filterByTitle(torrents, title);
    }

    if (season && season >= 0) {
      torrents = this.filterBySeason(torrents, season);
    }

    if (episode && episode >= 0) {
      torrents = this.filterByEpisode(torrents, episode);
    }

    return torrents;
  }

  filterByPropperties(torrents: Torrent[], filter: string): Torrent[] {
    const props = filter.toLowerCase().split(' ');

    return torrents.filter((torrent: Torrent) => {
      const properties = torrent.properties;
      let contains = 0;

      if (torrent.properties === undefined) { return false; }

      for (const p of props) {
        for (const property of Object.keys(properties)) {

          if (properties[property].toLowerCase().indexOf(p) !== -1) {
            contains += 1;
            break;
          }

        }

        if (contains === props.length) {
          return true;
        }
      }

      return false;
    });
  }

  filterByTitle(torrents: Torrent[], filter: string): Torrent[] {
    const keywords = filter.toLowerCase().split(' ');

    return torrents.filter((torrent: Torrent) => {
      const title = torrent.title.toLowerCase();
      let contains = 0;

      for (const keyword of keywords) {
        if (title.indexOf(keyword) !== -1) {
          contains += 1;
        }
      }

      return contains === keywords.length;
    });
  }

  filterBySeason(torrents: Torrent[], season: number): Torrent[] {
    return torrents.filter((torrent: Torrent) => {
      if (torrent.info.season === undefined) { return false; }
      return season >= torrent.info.season.begin && season <= torrent.info.season.end;
    });
  }

  filterByEpisode(torrents: Torrent[], episode: number): Torrent[] {
    return torrents.filter((torrent: Torrent) => {
      if (torrent.info.episode === undefined) { return false; }
      return episode === torrent.info.episode;
    });
  }

}
