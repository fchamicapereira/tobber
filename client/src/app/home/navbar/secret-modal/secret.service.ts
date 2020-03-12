import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Secret } from './secret';

@Injectable()
export class SecretService {

  private url = `${environment.api}/secret`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
  ) { }

  getSecret (): Observable<Secret> {
    return this.http.get<Secret>(this.url, {headers: this.headers });
  }

  refreshSecret(): Observable<Secret> {
    return this.http.put<Secret>(this.url, { headers: this.headers });
  }
}
