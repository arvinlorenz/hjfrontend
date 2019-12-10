import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, find, take, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StorageService } from '../shared/storage.service';
import * as jwt_decode from 'jwt-decode';

const BACK_END_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  public _user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private storageService: StorageService) { }

  get user() {
    return this._user.asObservable();
  }
  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (!user) {
          return false;
        }
        const role = jwt_decode(user.token).accountType;
        if (role === 'guest' || role === 'admin') {
          return true;
        } else {
          return false;
        }
      })
    );

  }

  get userIsAdmin() {
    return this._user.asObservable().pipe(
      map(user => {
        return true ? user.accountType === 'admin' : false;
      })
    );
  }

  autoLogin() {
    if (localStorage.getItem('token') === null) {
      return of(false);
    }
    return from(localStorage.getItem('token')).pipe(
      switchMap((token: any) => {

        if (!token ) {
          return null;
        }
        const accountType = jwt_decode(localStorage.getItem('token')).accountType;
        const user = jwt_decode(localStorage.getItem('token')).user;
        return of(user);
      }),
      tap(user => {
        if (user) {
          this._user.next({...user, token: localStorage.getItem('token')});
        }
      }),
      map(user => {
        return !!user;
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
    if (!localStorage) {
      alert('This browser does not support local storage. Please use other browsers');
    }
    localStorage.setItem('token', token);
    localStorage.setItem('accountType', accountType);
    localStorage.setItem('userId', userId);
  }


  logout() {
    this._user.next(null);
    localStorage.clear();
    location.reload();
  }
}
