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
  errorForm = false;

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
    this.authService.login(this.form.value.username, this.form.value.password).subscribe((user) => {

      if (user.accountType === 'admin') {
        this.dialogRef.close();
        this.router.navigateByUrl('/users');

      } else {
        this.dialogRef.close();

        this.router.navigateByUrl('/programs');

      }
    }, () => {
      this.errorForm = true;
    });

  }

}
