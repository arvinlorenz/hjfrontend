import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // tslint:disable-next-line: variable-name
  public _users = new BehaviorSubject<any>([]);

  get users() {
    return this._users.asObservable();
  }
}
