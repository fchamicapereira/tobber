import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/user';
import { EngineService } from '../../engine.service';
import { Site } from '../../site';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css']
})
export class SettingsModalComponent implements OnInit {

  me: User;
  sites: Site[];
  skip: object;

  pass: {
    old: string;
    new: string;
    confirm: string;
  };

  msg = {
    account: {
      msg: '',
      valid: true
    },
    search: {
      msg: '',
      valid: true
    }
  };


  constructor(
    private userService: UserService,
    private engineService: EngineService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.passInit();

    this.userService.getMe().subscribe( me => {
      this.me = me;

      this.engineService.getSites().subscribe( sites => {
        this.updateSkip(me, sites);
        this.sites = sites;
      });
    });
  }

  passInit(): void {
    this.pass = {
      old: '',
      new: '',
      confirm: ''
    };
  }

  updateSkip(me: User, sites: Site[]) {
    const skip = {};

    for (const site of me.preferences.skip) {
      skip[site] = true;
    }
    sites.forEach(v => {
      if (skip[v.name] === undefined) {
        skip[v.name] = false;
      }
    });

    this.skip = skip;
  }

  save() {
    const skip = [];

    for (const site of this.sites) {
      if (this.skip[site.name]) {
        skip.push(site.name);
      }
    }

    this.me.preferences.skip = skip;
    this.userService.changePreferences(this.me.preferences).subscribe(
      me => {
        this.me = me;
        this.updateSkip(me, this.sites);
        this.userService.updateMe(me);
        this.msg.search = {
          msg: 'Updated successfully',
          valid: true
        };
      },
      err => {
        this.msg.search = {
          msg: 'Could not update',
          valid: false
        };
      }
    );
  }

  changePassValid(): boolean {
    const pass = this.pass;

    if (pass === undefined) {
      return false;
    }

    for (const key of Object.keys(pass)) {
      if (pass[key] === undefined || pass[key].length < 8) {
        return false;
      }
    }

    return pass.new === pass.confirm;
  }

  changePass(): void {
    const pass = this.pass;
    this.userService.changePass(this.pass.old, this.pass.new).subscribe(
      me => {
        this.passInit();
        this.msg.account = {
          msg: 'Updated successfully',
          valid: true
        };
      },
      err => {
        this.msg.account = {
          msg: 'Unauthenticated or wrong old pass',
          valid: false
        };
      }
    );
  }

}
