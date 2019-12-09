import { Component, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import { UsersService } from './users/users.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  previousAuthState = false;

  constructor(private userService: UsersService, private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/');
      }
      this.previousAuthState = isAuth;

    });


    this.userService.fetchUsers().subscribe();

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }


}
