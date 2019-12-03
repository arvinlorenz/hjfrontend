import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
const BACK_END_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  get user() {
    return this._user.asObservable();
  }
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  login(username: string, password: string) {
    return this.http.post(`${BACK_END_URL}user/login`,
    {
      username,
      password,
    })
    .pipe(
      tap((userData: any) => {
        this.saveAuthData(
          userData.user._id,
          userData.token,
          userData.user.accountType);

        this._user.next({...userData.user, token: userData.token});
      })
    );
  }
  private saveAuthData(userId: string, token: string, accountType: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('accountType', accountType);
    localStorage.setItem('userId', userId);
  }
}
