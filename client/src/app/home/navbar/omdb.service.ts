import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { OmdbResponse, Search, TitleInfo, SeasonInfo } from './omdb';

@Injectable()
export class OmdbService {

  private omdbUrl = `${environment.omdb.url}/?apikey=${environment.omdb.key}`;

  constructor(
    private http: HttpClient,
  ) { }

  search (search: string): Observable<Search[]> {
    return this.http.get<OmdbResponse>(`${this.omdbUrl}&s=${search}`).pipe(
      map(response => response.Search)
    );
  }

  getSeasons (title: string): Observable<number> {
    return this.http.get<TitleInfo>(`${this.omdbUrl}&t=${title}`).pipe(
      map(response => response.Type === 'series' ?
        +response.totalSeasons : -1)
    );
  }

  getEpisodes (title: string, season: number): Observable<number> {
    return this.http.get<SeasonInfo>(`${this.omdbUrl}&t=${title}&season=${season}`).pipe(
      map(response => response.Response !== 'False' ?
        response.Episodes.length : -1)
    );
  }

}
