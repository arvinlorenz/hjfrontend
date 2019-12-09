import { Injectable } from '@angular/core';
import { tap, map, switchMap, take, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../shared/storage.service';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
const BACK_END_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private storageService: StorageService, private http: HttpClient) { }


  fetchUsers() {
    return this.http.get(`${BACK_END_URL}user/`)
        .pipe(
          map((usersData: any) => {
            return usersData.users.map(user => {
              return {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                table_no: user.table_no,
                coming: user.coming,
                contact: user.contact,
                companions: user.companions,
                accountType: user.accountType,
              };
            });

          }),
          tap((users: any) => {
            this.storageService._users.next(users);
        }));
  }

  getUser(userId) {
    console.log(userId);
    return this.storageService.users.pipe(
      map(users => {
        return users.filter(user => user.id === userId);
      }),
      map(user => user[0]));
  }

  addUser(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    tableNo: number,
    companions: any[]
  ) {
    let newUser;
    return this.http.post(`${BACK_END_URL}user/`, {
      username,
      password,
      firstname,
      lastname,
      table_no: tableNo,
      companions
    }).pipe(
      map((userData: any) => {
        return {
          id: userData.user._id,
          username: userData.user.username,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          table_no: userData.user.table_no,
          contact: userData.user.contact,
          coming: userData.user.coming,
          companions: userData.user.companions,
        };
      }),
      switchMap(user => {
        newUser = user;
        return this.storageService.users;
    }),
      take(1),
      tap(users => {
        const newUsers = [...users, newUser];
        this.storageService._users.next(newUsers);
      })
    );
  }

  updateUser(
    userData,
    userId: string,
    username: string,
    firstname: string,
    lastname: string,
    tableNo: number,
    companions: any[]
  ) {
    let updatedUser;
    return this.http.put(`${BACK_END_URL}user/` + userId, {
      ...userData,
      username,
      firstname,
      lastname,
      table_no: tableNo,
      companions
    }).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      map((userData: any) => {
        return {
          id: userData.user._id,
          username: userData.user.username,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          table_no: userData.user.table_no,
          contact: userData.user.contact,
          coming: userData.user.coming,
          companions: userData.user.companions,
        };
      }),
      switchMap((user) => {
        updatedUser = user;
        return this.storageService.users;
    }),
      take(1),
      tap(users => {
        const userIndex = users.findIndex(user => user.id === userId);
        users[userIndex] = updatedUser;
        console.log(users);
        this.storageService._users.next(users);
      })
    );
  }

  deleteUser(userId) {
    return this.http.delete(`${BACK_END_URL}user/` + userId)
        .pipe(
          switchMap(() => {
            return this.storageService.users;
          }),
          take(1),
          tap((users: any) => {
            const newUsers = users.filter(user => user.id !== userId);
            this.storageService._users.next(newUsers);
        }));
  }


  updateResponse(
    userId: string,
    coming: string,
    contact: string,
    companions
  ) {
    let updatedUser;
    return this.http.put(`${BACK_END_URL}user/` + userId, {
      coming,
      contact,
      companions
    }).pipe(
      map((userData: any) => {
        return {
          id: userData.user._id,
          username: userData.user.username,
          firstname: userData.user.firstname,
          lastname: userData.user.lastname,
          table_no: userData.user.table_no,
          contact: userData.user.contact,
          coming: userData.user.coming,
          companions: userData.user.companions,
        };
      }),
      switchMap((user) => {
        updatedUser = user;
        return this.storageService.users;
    }),
      take(1),
      switchMap(users => {
        const userIndex = users.findIndex(user => user.id === userId);
        users[userIndex] = updatedUser;
        this.storageService._users.next(users);
        return of(updatedUser);
      })
    );
    // .pipe(
      // tslint:disable-next-line: no-shadowed-variable
    //   map((userData: any) => {
    //     return {
    //       id: userData.user._id,
    //       username: userData.user.username,
    //       firstname: userData.user.firstname,
    //       lastname: userData.user.lastname,
    //       table_no: userData.user.table_no,
    //       seat_no: userData.user.seat_no,
    //       coming: userData.user.coming,
    //       companions: userData.user.companions,
    //     };
    //   }),
    //   switchMap((user) => {
    //     updatedUser = user;
    //     return this.storageService.users;
    // }),
    //   take(1),
    //   tap(users => {
    //     const userIndex = users.findIndex(user => user.id === userId);
    //     users[userIndex] = updatedUser;
    //     console.log(users);
    //     this.storageService._users.next(users);
    //   })
    // );
  }
}
