import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAdmin.pipe(
      take(1),
      tap(isAdmin => {
        if (!isAdmin) {
            this.router.navigateByUrl('/programs');
          }
      })
    );
  }

}
