import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { EngineService } from '../engine.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  savedMe: User;
  me: User;
  rules: String[];
  defaultRules: object;
  modified = false;

  constructor(
    private userService: UserService,
    private engineService: EngineService
  ) { 
    this.userService.setTobberURL(location.hostname);
    this.engineService.setTobberURL(location.hostname);
  }

  ngOnInit() {
    this.userService.getMe()
      .subscribe(me => {
        this.savedMe = JSON.parse(JSON.stringify(me));
        this.me = me;
        this.rules = Object.keys(me.rules);
      });

    this.engineService.getDefaultRules()
      .subscribe(defaultRules => this.defaultRules = defaultRules);
  }

  onChange(): void {
    this.modified = true;
  }

  removeKeyword(rule: string, key: string, keyword: string): void {
    const r = this.me.rules[rule];

    for (const prop of r) {
      if (prop.key === key) {
        const i = prop.keywords.indexOf(keyword);
        if (i > -1) {
          prop.keywords.splice(i);
          this.modified = true;
        }
      }
    }
  }

  addKey(rule: string, key: string): void {
    this.me.rules[rule].push({
      key: key,
      keywords: [],
      value: 1
    });
  }

  addKeyword(rule: string, key: string, keyword: string): void {
    const r = this.me.rules[rule];

    for (const prop of r) {
      if (prop.key === key) {
        prop.keywords.push(keyword);
        this.modified = true;
      }
    }
  }

  removeKey(rule: string, key: string): void {
    const r = this.me.rules[rule];

    for (let i = 0; i < r.length; i++) {
      if (r[i].key === key) {
        r.splice(i, 1);
        this.modified = true;
      }
    }
  }

  save(): void {
    this.userService.changeRules(this.me.rules)
      .subscribe(me => {
        this.savedMe = JSON.parse(JSON.stringify(me));
        this.me = me;
        this.modified = false;
      });
  }

  revertChanges(): void {
    this.me = JSON.parse(JSON.stringify(this.savedMe));
    this.modified = false;
  }

  revertToDefault(): void {
    this.me.rules = JSON.parse(JSON.stringify(this.defaultRules)); // deep copy
    this.modified = true;
  }
}
