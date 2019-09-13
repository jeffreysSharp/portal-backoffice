import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard extends AuthGuard implements CanActivateChild {
    constructor(router: Router, authService: AuthService) {
        super(router, authService);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const validateRoles = this.authService.validateRoles;
        const payloadToken = this.authService.getTokenPayload();
        const userRoles = payloadToken.realm_access.roles;
        const routeRoles = route.data.roles;

        return super
            .canActivateChild(route, state)
            .pipe(switchMap(isAuthorized => (isAuthorized ? validateRoles(userRoles, routeRoles) : of(false))));
    }
}
