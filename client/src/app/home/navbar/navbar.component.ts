import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../user/user';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { SecretModalComponent } from './secret-modal/secret-modal.component';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { UserService } from '../../user/user.service';
import { EngineService } from '../engine.service';
import { EngineResponse } from '../engineResponse';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { OmdbService } from './omdb.service';
import { OmdbResponse, Search } from './omdb';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('instance') instance: NgbTypeahead;

  public search: any;
  omdb = false;

  subscription: Subscription;
  crawling = false;
  me: User;

  navbarOpen = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private engineService: EngineService,
    private omdbService: OmdbService,
    private router: Router
  ) {
    this.userService.getMe().subscribe( me => {
      this.updateMe(me);
    });
    this.subscription = this.engineService.getEngineResponse()
      .subscribe( er => {
        this.crawling = false;
      });
  }

  ngOnInit() {}

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  private updateMe(me: User) {
    this.me = me;
    if (me.preferences.omdb !== undefined) {
      this.omdb = me.preferences.omdb;
    }
  }

  omdbSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        if (this.crawling) {
          this.instance.dismissPopup();
          return of([]);
        }
        return (term === undefined || term.length <= 2) ?
          of([]) :
          this.omdbService.search(term).pipe(
            catchError(() => of([])),
          );
        }),
      map(term => term ? term.splice(0, 5) : term),
    )

  formatter = (x: Search) => x.Title;

  openSecret() {
    const modalRef = this.modalService.open(SecretModalComponent);
  }

  openUsers() {
    const modalRef = this.modalService.open(UsersModalComponent);
  }

  openSettings() {
    const modalRef = this.modalService.open(SettingsModalComponent)
      .result
        .then( (result: User) => {
          this.updateMe(result);
        })
        .catch( (err) => { });
  }

  logout() {
    this.userService.logout();
  }

  validSearch(): boolean {
    if (this.search === undefined) { return false; }

    const search = this.search.Title ? this.search.Title : this.search;

    return search.length === 0 || search.trim().length === 0;
  }

  crawl() {
    if (this.instance) {
      this.instance.dismissPopup();
    }
    const search = this.search.Title ? this.search.Title : this.search.trim();

    this.userService.getMe().subscribe( me => {
      this.engineService.crawl(search, this.me.preferences);
      this.crawling = true;
      this.router.navigate(['/']);
    });
  }
}
