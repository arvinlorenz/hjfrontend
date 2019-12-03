import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
