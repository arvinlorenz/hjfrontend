import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  coming() {
    this.authService.user.pipe(
      take(1),
      map(user => {
        return user.companions;
      })
    ).subscribe(companions => {
      if (companions.length > 0) {
        this.router.navigate(['invites', 'companions'], { queryParams: { res: 'coming' } });
      } else {
      }
    });
  }
  notComing() {
    this.authService.user.pipe(
      take(1),
      map(user => {
        return user.companions;
      })
    ).subscribe(companions => {
      if (companions.length > 0) {
        this.router.navigate(['invites', 'companions'], { queryParams: { res: 'not-coming' } });
      } else {
        this.router.navigate(['invites', 'thank-you']);
      }
    });
  }

}
