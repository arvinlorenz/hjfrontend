import { Component, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import * as $ from 'jquery';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
declare var System: any;


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})

export class ProgramComponent implements OnInit {
  user;
  companions = [];
  companionsResponse;
  form;
  userResponse;
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.form = this.fb.group({
      contact: [null, Validators.required]
    });

    $('#companions-checkbox').hide();
    $('#ceremony-submit').hide();
    await System.import('../../assets/template/js/main.js');
    this.authService.user.pipe(
      take(1),
      map(user => {
        this.user = user;
        console.log(this.user);
        if (this.user.coming === 'not confirmed') {
          $('#attending-form').show();
          $('#responded').hide();

        } else {
          this.form = this.fb.group({
            contact: [user.contact, Validators.required]
          });
          $('#attending-form').hide();
          $('#responded').show();
        }
        return user.companions;
      })
    ).subscribe(companions => {
      this.companions = companions;
      this.companionsResponse = companions.map(companion => {
        return {
          id: companion._id,
          coming: false
        };
      });
    });
  }

  onChange(e) {
    const index = this.companionsResponse.findIndex(c => c.id === e.target.value);
    this.companionsResponse[index].coming = e.target.checked;
  }

  coming() {
    this.userResponse = 'coming';
    if (this.companions.length > 0) {
      $('#companions-checkbox').fadeIn();
      $('#ceremony-buttons').hide();
      $('#ceremony-submit').fadeIn();
    } else {
      // tslint:disable-next-line: max-line-length
      this.userService.updateResponse(this.user._id, this.userResponse, this.form.value.contact, this.companions).subscribe((updatedUser) => {
        this.user = {...this.user, ...updatedUser};
        $('#attending-form').hide();
        $('#responded').show();
      });
    }
  }

  notcoming() {
    this.userResponse = 'not coming';
    if (this.companions.length > 0) {
      $('#companions-checkbox').fadeIn();
      $('#ceremony-buttons').hide();
      $('#ceremony-submit').fadeIn();
    } else {
      // tslint:disable-next-line: max-line-length
      this.userService.updateResponse(this.user._id, this.userResponse, this.form.value.contact, this.companions).subscribe((updatedUser) => {
        this.user = {...this.user, ...updatedUser};
        $('#attending-form').hide();
        $('#responded').show();
      });
    }
  }

  editButton() {
    $('#attending-form').show();
    $('#companions-number').show();
    $('#ceremony-buttons').show();
    $('#ceremony-submit').hide();
    $('#companions-checkbox').hide();

    $('#responded').hide();

  }
  submit() {
    let res;
    this.companionsResponse.forEach(comRes => {
      const index = this.companions.findIndex(companion => companion._id === comRes.id);
      res = comRes.coming ? 'coming' : 'not coming';
      this.companions[index].coming = res;
    });
    this.userService.updateResponse(this.user._id, this.userResponse, this.form.value.contact, this.companions).subscribe((updatedUser) => {
      this.user = {...this.user, ...updatedUser};
      $('#attending-form').hide();
      $('#responded').show();
    });
  }

  logout() {
    this.authService.logout();
  }
}
