import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {

    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  onLogin() {
    if (!this.form.valid) {
      return;
    }
    this.dialogRef.close();
    this.authService.login(this.form.value.username, this.form.value.password).subscribe((user) => {
      console.log(user);

      if (user.accountType === 'admin') {
        this.router.navigateByUrl('/users');

      } else if (user.accountType === 'guest' && user.coming === 'not confirmed') {
        this.router.navigateByUrl('/invites');
      } else if (user.coming === 'not coming') {
        this.router.navigateByUrl('/invites/thank-you');
      } else {
        this.router.navigateByUrl('/invites/ty');
      }
    });

  }

}
