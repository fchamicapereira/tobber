import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from './user';
import { AuthGuardService } from '../auth-guard.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private tobberUrl;
  private me: User;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private authGuardService: AuthGuardService,
    private router: Router
  ) { }

  setTobberURL(hostname: string) {
    this.tobberUrl = `http://${hostname}:${environment.port}/api`;
  }

  isLoggedin (): boolean {
    return this.authGuardService.isAuthenticated();
  }

  updateMe (me: User): void {
    this.me = me;
  }

  getUsers (): Observable<User[]> {
    const url = `${this.tobberUrl}/user`;
    return this.http.get<User[]>(url, { headers: this.headers, reportProgress: true });
  }

  getMe (): Observable<User> {
    const url = `${this.tobberUrl}/user/me`;

    if (this.me) {
      return of(this.me);
    }

    return this.http.get<User>(url, { headers: this.headers, reportProgress: true });
  }

  login (name: String, pass: String): Observable<User> {
    const url = `${this.tobberUrl}/login`;
    console.log('request to', url);

    return this.http.put<User>(url, { name: name, pass: pass }, { headers: this.headers })
      .pipe(
        tap(res => {
          this.me = res;
          localStorage.setItem(environment.token, res.token);
        }),
      );
  }

  logout (): void {
    localStorage.removeItem(environment.token);
    this.router.navigate(['/login']);
  }

  signup (name: String, pass: String, secret: String): Observable<User> {
    const url = `${this.tobberUrl}/signup`;

    return this.http.post<User>(url,
      { name: name, pass: pass, secret: secret },
      { headers: this.headers })
      .pipe(
        tap(res => {
          this.me = res;
          localStorage.setItem(environment.token, res.token);
        })
      );
  }

  changeRules (rules: object): Observable<User> {
    const url = `${this.tobberUrl}/user/me/rules`;
    return this.http.put<User>(url, { rules: rules }, { headers: this.headers });
  }

  changePreferences (preferences: object): Observable<User> {
    const url = `${this.tobberUrl}/user/me/preferences`;
    return this.http.put<User>(url, { preferences: preferences }, { headers: this.headers });
  }

  changePass (old_pass: string, new_pass: string): Observable<User> {
    const url = `${this.tobberUrl}/user/me/pass`;
    return this.http.put<User>(url, {
      old_pass: old_pass,
      new_pass: new_pass
    }, { headers: this.headers });
  }

  deleteUser (name: String): Observable<User> {
    const url = `${this.tobberUrl}/user/${name}`;
    return this.http.delete<User>(url, { headers: this.headers });
  }

  promote (name: String): Observable<User> {
    const url = `${this.tobberUrl}/user/${name}/promote`;
    return this.http.put<User>(url, { headers: this.headers });
  }

  demote (name: String): Observable<User> {
    const url = `${this.tobberUrl}/user/${name}/demote`;
    return this.http.put<User>(url, { headers: this.headers });
  }

  clearTop (): Observable<User> {
    const url = `${this.tobberUrl}/user/me/top`;
    return this.http.delete<User>(url, { headers: this.headers });
  }

  removeFromTop (id: String): Observable<User> {
    const url = `${this.tobberUrl}/user/me/top/${id}`;
    return this.http.delete<User>(url, { headers: this.headers });
  }
}
