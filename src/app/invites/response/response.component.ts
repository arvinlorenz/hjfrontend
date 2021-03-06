import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { take, map } from 'rxjs/operators';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private userService: UsersService) { }

  ngOnInit() {
  }

  coming() {
    let userId;
    this.authService.user.pipe(
      take(1),
      map(user => {
        userId = user._id;
        return user.companions;
      })
    ).subscribe(companions => {
      if (companions.length > 0) {
        this.router.navigate(['invites', 'companions'], { queryParams: { res: 'coming' } });
      } else {
        this.userService.updateResponse(userId, 'coming', '', []).subscribe(() => {
            this.router.navigate(['programs']);
        });
      }
    });
  }
  notComing() {
    let userId;
    this.authService.user.pipe(
      take(1),
      map(user => {
        userId = user._id;
        return user.companions;
      })
    ).subscribe(companions => {
      if (companions.length > 0) {
        this.router.navigate(['invites', 'companions'], { queryParams: { res: 'not-coming' } });
      } else {
        this.userService.updateResponse(userId, 'not coming', '', []).subscribe(() => {
          this.router.navigate(['programs']);
      });
      }
    });
  }

}
