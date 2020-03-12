import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../user/user';
import { EngineResponse } from './engineResponse';
import { Subject } from 'rxjs/Subject';
import { Info } from './torrents/info';
import { Site } from './site';

@Injectable()
export class EngineService {

  private tobberUrl = `${environment.api}/engine`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private me: User;
  private defaultRules: object;
  private engineResponse: Subject<EngineResponse> = new Subject<EngineResponse>();

  constructor(
    private http: HttpClient,
  ) { }

  getEngineResponse(): Observable<EngineResponse> {
    return this.engineResponse.asObservable();
  }

  getDefaultRules (): Observable<object> {
    if (this.defaultRules) {
      return of(this.defaultRules);
    }

    return this.http.get<object>(`${this.tobberUrl}/rules`, { headers: this.headers });
  }

  crawl (search: string, opt?: any): void {
    let params = new HttpParams();

    if (opt && opt.limit !== undefined) {
      params = params.append('limit', opt.limit);
    }

    if (opt && opt.skip !== undefined) {
      for (const site of opt.skip) {
        params = params.append('skip', site);
      }
    }

    if (opt && opt.anime !== undefined) {
      params = params.append('anime', opt.anime);
    }

    if (opt && opt.sort !== undefined) {
      params = params.append('sort', opt.sort);
    }

    this.http.get<EngineResponse>(`${this.tobberUrl}/crawl/${search}`,
      { headers: this.headers, params: params })
      .subscribe( res => {
        res.search = search;
        this.engineResponse.next(res);
      });
  }

  getInfo (url: string): Observable<Info> {
    return this.http.put<Info>(`${this.tobberUrl}/info`,
      { url: url }, { headers: this.headers });
  }

  getSites (): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.tobberUrl}/sites`, { headers: this.headers });
  }
}
