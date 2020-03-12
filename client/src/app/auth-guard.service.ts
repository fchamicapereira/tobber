import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public jwtHelper: JwtHelperService,
    public router: Router
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
