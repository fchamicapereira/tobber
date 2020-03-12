import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class QbittorrentService {

  private url = 'http://89.115.125.182:8080';
  private headers = new HttpHeaders();
  private user: string;
  private pass: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('Referer', 'http://localhost:4200');
  }

  authenticate(user: string, pass: string): void {
    this.user = user;
    this.pass = pass;
  }

  private login(): Observable<boolean> {
    console.log('logging in');

    return this.httpClient.post<string>(`${this.url}/login`,
      `username=${this.user}&password=${this.pass}`,
      { headers: this.headers }
    )
      .pipe(
        tap (res => console.log(res) ),
        map(res => {
          console.log(res);
          return true;
        })
      );
  }

  getTorrents(): void {
    this.login().subscribe(res => console.log('res', res));
  }

}
