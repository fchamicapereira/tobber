import { Component, OnInit } from '@angular/core';
import { UserForm } from './userForm';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: UserForm;
  error: String;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userService.isLoggedin()) {
      this.router.navigate(['/']);
    }

    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form !== undefined) {
      form.resetForm();
    }

    this.user = {
      username: '',
      password: '',
      password2: '',
      secret: ''
    };
  }

  onSubmit() {
    this.userService.signup(this.user.username, this.user.password, this.user.secret)
      .subscribe( (user: User) => {
          this.router.navigate(['/']);
        }, (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              this.error = 'Invalid secret';
              break;
            case 409:
              this.error = 'Username taken';
              break;
          }
      });
  }

}
