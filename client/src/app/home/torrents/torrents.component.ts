import { Component, OnInit, Input } from '@angular/core';
import { EngineResponse } from '../engineResponse';
import { Torrent } from './torrent';
import { Info } from './info';
import { EngineService } from '../engine.service';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OmdbService } from '../navbar/omdb.service';
import { TitleInfo } from '../navbar/omdb';

const separator = '[ \\[\\]\\,\\.\\-\\;_\\(\\)]+';

const expressions = {
  batch: [
    {
      first: new RegExp(`${separator}s(\\d+)${separator}s?\\d+${separator}`, 'i'),
      last: new RegExp(`${separator}s\\d+${separator}s?(\\d+)${separator}`, 'i'),
    },
    {
      first: new RegExp(`${separator}seasons?${separator}(?:(\\d+)${separator})+?`, 'i'),
      last: new RegExp(`${separator}seasons?${separator}(?:(\\d+)${separator})+`, 'i'),
    },
    {
      first: new RegExp(`${separator}(?:se(\\d+)${separator})+?`, 'i'),
      last: new RegExp(`${separator}(?:se(\\d+)${separator})+`, 'i'),
    }

  ],
  season: [
    new RegExp(`${separator}s(\\d+)${separator}s?(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}s(\\d+)`, 'i'),
    new RegExp(`${separator}season (\\d+)`, 'i'),
    new RegExp(`${separator}season(\\d+)`, 'i'),
    new RegExp(`${separator}(\\d+)x\\d+`, 'i'),
  ],
  episode: [
    new RegExp(`${separator}s?\\d+e(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}s?\\d+${separator}e(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}s?\\d+episode(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}s?\\d+${separator}episode(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}s?\\d+ep(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}s?\\d+${separator}ep(\\d+)${separator}`, 'i'),
    new RegExp(`${separator}\\d+x(\\d+)${separator}`, 'i'),
  ],
  final: {
    complete: new RegExp(`${separator}complete${separator}`, 'i'),
  }
};

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.css']
})
export class TorrentsComponent implements OnInit {

  top: boolean;

  myProperties: string[] = [];

  searched: string;
  torrents: Torrent[];
  subscription: Subscription;
  inspecting: string[] = [];
  objectKeys = Object.keys; // hack for use on the html

  showScores = false;

  filter_season: number;
  filter_episode: number;
  filter_property: string;
  filter_title: string;

  sortBy = 'Score';
  seasons: number[] = [];
  episodes: number[] = [];

  constructor(
    private engineService: EngineService,
    private userService: UserService,
    private omdbService: OmdbService,
    private router: Router,
  ) {
    this.top = this.router.url === '/top';

    if (!this.top) {
      this.engineService.getEngineResponse()
        .subscribe( engineResponse => {
          this.torrents = engineResponse.data;
          this.searched = engineResponse.search;

          for (const torrent of engineResponse.data) {
            this.updateTorrentInfo(torrent);
          }

          this.omdbService.getSeasons(engineResponse.search)
            .subscribe( n => {
              const seasons = [];
              for (let i = 1; i <= n; i++) { seasons.push(i); }
              this.seasons = seasons;
            });
        });
    }

    this.userService.getMe().subscribe( me => {
      for (const rule of Object.keys(me.rules)) {
        for (const property of me.rules[rule]) {
          this.myProperties.push(property.key);
        }
      }

      if (this.top) {
        this.torrents = me.top;
      }
    });
  }

  ngOnInit() {
    this.filter_property = '';
    this.filter_title = '';
    this.filter_season = -1;
    this.filter_episode = -1;
  }

  searchForProperty = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        if (term.length < 1) { return []; }

        const terms = term.split(' ');
        const currentTerm = terms[terms.length - 1];

        return this.myProperties.filter(
          v => v.toLowerCase().indexOf(currentTerm.toLowerCase()) > -1).slice(0, 10);
      })
    )

  searchForEpisode(): void {
    this.omdbService.getEpisodes(this.searched, this.filter_season)
      .subscribe(n => {
        const episodes = [];
        for (let i = 1; i <= n; i++) { episodes.push(i); }
        this.episodes = episodes;
      });
  }

  filterPropertySelected(event: any) {
    event.preventDefault();

    const properties = this.filter_property.split(' ');
    properties.splice(properties.length - 1, 1);
    properties.push(event.item + ' ');
    this.filter_property = properties.join(' ');
  }

  searchForTorrent(id: string): Torrent | null {
    for (const torrent of this.torrents) {
      if (torrent.id === id) {
        return torrent;
      }
    } return null;
  }

  inspect(id: string) {
    this.inspecting.push(id);

    let torrent = this.searchForTorrent(id);

    this.engineService.getInfo(torrent.href)
      .subscribe(newTorrent => {
        torrent = Object.assign(torrent, newTorrent);
        this.inspecting.splice(this.inspecting.indexOf(id), 1);
      }, err => { this.inspecting.splice(this.inspecting.indexOf(id), 1); });

  }

  clearTop() {
    this.userService.clearTop().subscribe( me => {
      this.torrents = me.top;
    });
  }

  removeFromTop(id: string) {
    this.userService.removeFromTop(id).subscribe( me => {
      this.torrents = me.top;
    });
  }

  updateTorrentInfo(torrent: Torrent) {
    const info = {};
    const title = ` ${torrent.title} `;

    for (const exp of expressions.batch) {
      const result = exp.first.exec(title);

      if (result) {
        info['season'] = {
          begin: +result[1],
          end: +exp.last.exec(title)[1]
        };

        torrent.info = info;
        return;
      }
    }

    for (const exp of expressions.season) {
      const result = exp.exec(title);

      if (result) {
        info['season'] = {
          begin: +result[1],
          end: +result[1],
        };
        break;
      }
    }

    for (const exp of expressions.episode) {
      const result = exp.exec(title);

      if (result) {
        info['episode'] = +result[1];
        break;
      }
    }

    if (info['season'] || info['episode']) {
        torrent.info = info;
        return;
    }

    const result = expressions.final.complete.exec(title);

    if (result) {
      info['season'] = {
        begin: 1,
        end: 100
      };
    }

    torrent.info = info;
    return;
  }

}
