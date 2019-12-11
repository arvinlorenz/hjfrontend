import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from './user-create/user-create.component';
import { StorageService } from '../shared/storage.service';
import { tap, map, count } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Companion {
  id: string;
  firstname: string;
  lastname: string;
  table_no: number;
  coming: boolean;
}
export interface UsersElement {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  table_no: number;
  coming: boolean;
  contact: string;
  companions: [Companion];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['table_no', 'username', 'firstname', 'lastname', 'response', 'contact', 'companions'];
  dataSource;
  users;

  coming = 0;
  notComing = 0;
  notConfirmed = 0;

  constructor(
    private userService: UsersService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.storageService.users.pipe(
      tap((users) => {
        this.users = users.filter(user => user.accountType !== 'admin');
        this.dataSource = new MatTableDataSource(this.users);
      }),
      tap(users => {
        this.coming = users.filter(u => {
          return u.coming === 'coming' && u.accountType === 'guest';
        }).length;
        users.forEach(u => {
          this.coming += u.companions.filter(us => us.coming === 'coming').length;
        });

        this.notComing = users.filter(u => {
          return u.coming === 'not coming' && u.accountType === 'guest';
        }).length;
        users.forEach(u => {
          this.notComing += u.companions.filter(us => us.coming === 'not coming').length;
        });


        this.notConfirmed = users.filter(u => {
          return u.coming === 'not confirmed' && u.accountType === 'guest';
        }).length;
        users.forEach(u => {
          this.notConfirmed += u.companions.filter(us => us.coming === 'not confirmed').length;
        });

      })
    ).subscribe();

  }

  userInfo(userId) {
    // this.router.navigate(['/', 'users', userId]);
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: 'auto',
      height: 'max-content',
      data: {
        mode: 'edit',
        userId
      }
    });
  }

  addDialog() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: 'auto',
      height: 'max-content',
      data: {
        mode: 'add'
      }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   this.dataSource = new MatTableDataSource([...this.users, result ]);
    // });
  }
}
