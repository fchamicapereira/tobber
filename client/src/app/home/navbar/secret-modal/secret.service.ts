import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Secret } from './secret';

@Injectable()
export class SecretService {

  private tobberUrl;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
  ) { }

  setTobberURL(hostname: string) {
    this.tobberUrl = `http://${hostname}:${environment.port}/api/secret`;
  }

  getSecret (): Observable<Secret> {
    return this.http.get<Secret>(this.tobberUrl, {headers: this.headers });
  }

  refreshSecret(): Observable<Secret> {
    return this.http.put<Secret>(this.tobberUrl, { headers: this.headers });
  }
}
