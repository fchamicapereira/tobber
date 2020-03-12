import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { SecretModalComponent } from './home/navbar/secret-modal/secret-modal.component';
import { RulesComponent } from './home/rules/rules.component';
import { TorrentsComponent } from './home/torrents/torrents.component';
import { UsersModalComponent } from './home/navbar/users-modal/users-modal.component';
import { SettingsModalComponent } from './home/navbar/settings-modal/settings-modal.component';
import { TorrentClientComponent } from './home/torrent-client/torrent-client.component';

import { UserService } from './user/user.service';
import { AuthGuardService } from './auth-guard.service';
import { SecretService } from './home/navbar/secret-modal/secret.service';
import { EngineService } from './home/engine.service';
import { OmdbService } from './home/navbar/omdb.service';

import { SortByPipe } from './home/torrents/sort-by.pipe';
import { SafeUrlPipe } from './home/torrents/safe-url.pipe';
import { TorrentFilterPipe } from './home/torrents/torrent-filter.pipe';

import { environment } from '../environments/environment';
import { QbittorrentService } from './home/torrent-client/qbittorrent.service';

export function tokenGetter() {
  return localStorage.getItem(environment.token);
}

const enableTracing = environment.production;

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuardService ],
    children: [
      { path: '', component: TorrentsComponent, canActivate: [ AuthGuardService ] },
      { path: 'top', component: TorrentsComponent, canActivate: [ AuthGuardService ] },
      { path: 'rules', component: RulesComponent, canActivate: [ AuthGuardService ] },
      { path: 'client', component: TorrentClientComponent, canActivate: [ AuthGuardService ] },
    ]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignupComponent }]
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    SignupComponent,
    NavbarComponent,
    SecretModalComponent,
    RulesComponent,
    TorrentsComponent,
    SortByPipe,
    UsersModalComponent,
    SettingsModalComponent,
    SafeUrlPipe,
    TorrentFilterPipe,
    TorrentClientComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing } // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelisteddomains,
        blacklistedRoutes: environment.blacklisteddomains
      }
    }),
    NgbModule.forRoot(),
  ],
  exports: [
    SecretModalComponent
  ],
  entryComponents: [
    SecretModalComponent,
    UsersModalComponent,
    SettingsModalComponent
  ],
  providers: [
    UserService,
    AuthGuardService,
    SecretService,
    EngineService,
    OmdbService,
    QbittorrentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
