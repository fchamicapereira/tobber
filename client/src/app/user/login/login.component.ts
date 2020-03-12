import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private me: User;
  isLoginError = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    if (this.userService.isLoggedin()) {
      this.router.navigate(['/']);
    }
  }

  OnSubmit(userName, password) {
    this.userService.login(userName, password).subscribe( (user: User) => {
      this.router.navigate(['/']);
    }, (err: HttpErrorResponse) => {
      this.isLoginError = true;
   });
 }
}
