import { Pipe, PipeTransform } from '@angular/core';
import { Torrent } from '../torrents/torrent';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  bytes = [
    { key: 'G', value: 1e9 },
    { key: 'Gi', value: Math.pow(2, 30) },
    { key: 'M', value: 1e6 },
    { key: 'Mi', value: Math.pow(2, 20) },
    { key: 'K', value: 1e3 },
    { key: 'Ki', value: Math.pow(2, 10) },
  ];

  convert(s: string, bytes: any): number {
    const n = parseFloat(s.split(' ')[0]);
    const mul = s.split(' ')[1];

    for (const b of bytes) {
      if (mul.indexOf(b.key) !== -1) {
        return n * b.value;
      }
    }

    return 0;
  }

  sortBySite(torrents: Torrent[]) {
    torrents.sort((a: Torrent, b: Torrent) => a.site.localeCompare(b.site));
  }

  sortByTitle(torrents: Torrent[]) {
    torrents.sort((a: Torrent, b: Torrent) => a.title.localeCompare(b.title));
  }

  sortBySize(torrents: Torrent[]) {
    const convert = this.convert;
    const bytes = this.bytes;

    torrents.sort((a: Torrent, b: Torrent) => {
      const aSize = convert(a.size, bytes);
      const bSize = convert(b.size, bytes);

      if (aSize < bSize) { return 1; }
      if (aSize > bSize) { return -1; }
      return 0;
    });
  }

  sortByScore(torrents: Torrent[]) {
    torrents.sort((a: Torrent, b: Torrent) => {
      if (a.score < b.score) { return 1; }
      if (a.score > b.score) { return -1; }
      return 0;
    });
  }

  sortBySeeders(torrents: Torrent[]) {
    torrents.sort((a: Torrent, b: Torrent) => {
      if (a.seeders < b.seeders) { return 1; }
      if (a.seeders > b.seeders) { return -1; }
      return 0;
    });
  }

  transform(torrents: Torrent[], param: string): Torrent[] {
    switch (param) {
      case 'Site':
        this.sortBySite(torrents);
        break;

      case 'Title':
        this.sortByTitle(torrents);
        break;

      case 'Size':
        this.sortBySize(torrents);
        break;

      case 'Score':
        this.sortByScore(torrents);
        break;

      case 'Seeders':
        this.sortBySeeders(torrents);
        break;

    }

    return torrents;
  }

}
