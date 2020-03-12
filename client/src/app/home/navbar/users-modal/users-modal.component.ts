import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.css']
})
export class UsersModalComponent implements OnInit {

  users: User[];
  me: User;

  constructor(
    private userService: UserService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.get();
    this.userService.getMe().subscribe( me => this.me = me );
  }

  get(): void {
    this.userService.getUsers().subscribe( users => this.users = users );
  }

  delete(name: string): void {
    this.userService.deleteUser(name).subscribe( user => { this.get(); } );
  }

  promote(name: string): void {
    this.userService.promote(name).subscribe( user => { this.get(); } );
  }

  demote(name: string): void {
    this.userService.demote(name).subscribe( user => { this.get(); } );
  }
}
