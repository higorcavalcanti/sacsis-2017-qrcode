import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {JwtHelper} from "angular2-jwt";
import {ReplaySubject} from "rxjs/ReplaySubject";

import {Api} from './api';
import {Database} from "./database";

@Injectable()
export class AuthProvider {
  public authUser = new ReplaySubject<any>(1);

  constructor(private api: Api, private db: Database, private jwtHelper: JwtHelper) {

  }

  login(accountInfo: any) {

    this.logout();

    return new Promise((resolve, reject) => {
      this.api.post('auth/login', accountInfo, true).subscribe(
        (data: any) => {
          this._loggedIn(data);
          resolve(data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  signup(accountInfo: any) {
    return new Promise((resolve, reject) => {
      this.api.post('auth/register', accountInfo, true).subscribe(
        (data: any) => {
          this._loggedIn(data);
          resolve(data);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  checkLogin() {
    this.db.get('jwt_token').then(
      (jwt: any) => {
        if (!jwt || this.jwtHelper.isTokenExpired(jwt)) {
          this.logout();
        }
        else {
          this.api.get('auth/check').subscribe(
            (data) => {
              this.authUser.next(jwt)
            },
            (err) => this.logout()
          );
        }
      },
      (error: any) => {
        this.logout();
      }
    );
  }

  logout() {
    this.authUser.next(null);
    //this.db.set('jwt_token', null);
    this.db.clear();
  }

  private _loggedIn(resp) {
    //this._user = resp.user;
    this.db.set('jwt_token', resp.data.token);
  }

}
