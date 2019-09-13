
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(protected router: Router, protected authService: AuthService) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.router.url == '/sessions/signin2') return of(true);

    return this.authService.getAccessToken().pipe(
      switchMap((token: string) => {
        if (this.isNullOrWhiteSpace(token)) {
          this.router.navigate(['sessions/signin2']);
          return of(false);
        }

        return this.authService.validateToken(token).pipe(
          catchError(err => {
            if (err.status == 401) {
              this.router.navigate(['sessions/signin2']);
            } else if (err.status == 403) {
              this.router.navigate(['dashboard']);
            }
            return of(false);
          })
        );
      })
    );
  }

  private isNullOrWhiteSpace(str: string) {
    return !str || str.length === 0 || /^\s*$/.test(str);
  }
}