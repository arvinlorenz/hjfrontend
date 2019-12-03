import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from './user-create/user-create.component';
import { StorageService } from '../shared/storage.service';

export interface Companion {
  id: string;
  firstname: string;
  lastname: string;
  table_no: number;
  seat_no: number;
  coming: boolean;
}
export interface UsersElement {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  table_no: number;
  seat_no: number;
  coming: boolean;
  companions: [Companion];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['table_no', 'seat_no', 'firstname', 'lastname', 'response', 'companions'];
  dataSource;
  users;

  constructor(
    private userService: UsersService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.userService.fetchUsers().subscribe();
    this.storageService.users.subscribe((users) => {
      this.users = users.filter(user => user.accountType !== 'admin');
      this.dataSource = new MatTableDataSource(this.users);
    });
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
