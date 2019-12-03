import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take, map, switchMap } from 'rxjs/operators';
import { UsersService } from 'src/app/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss']
})
export class CompanionsComponent implements OnInit {
  companions;
  companionsResponse;
  user;
  response;
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params => {
        this.response = params.res === 'coming' ? 'coming' : 'not coming';
        return this.authService.user;
      }),
      take(1),
      map(user => {
        this.user = user;
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
    const index = this.companionsResponse.findIndex(c => c.id === e.source.value);
    this.companionsResponse[index].coming = e.checked;
  }

  submit() {
    let res;
    this.companionsResponse.forEach(comRes => {
      const index = this.companions.findIndex(companion => companion._id === comRes.id);
      res = comRes.coming ? 'coming' : 'not coming';
      this.companions[index].coming = res;
    });

    this.userService.updateResponse(this.user._id, this.response, this.companions).subscribe(() => {
      if (res === 'coming') {
        this.router.navigate(['invites', 'ty']);

      } else {
        this.router.navigate(['invites', 'thank-you']);
      }
    });
  }

}
