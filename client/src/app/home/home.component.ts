import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private me: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getMe().subscribe( me => this.me = me, err => {
      this.userService.logout();
    } );
  }
}
