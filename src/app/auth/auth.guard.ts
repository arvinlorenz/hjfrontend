import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.userIsAuthenticated.pipe(
        take(1),
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}
