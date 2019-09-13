import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import * as JWT from 'jwt-decode';
import { Observable, of, ReplaySubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../models/auth.model';
import { tap } from 'rxjs/operators';

const sessionName = 'user@backoffice';

@Injectable()
export class AuthService {
    credentials$ = new ReplaySubject<Auth.AccessData>();

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

    signin(model: Auth.Signin): Observable<Auth.AccessData> {
        const url = `${environment.BASE_GATEWAY}/auth/login`;

        return this.http.post<Auth.AccessData>(url, model).pipe(tap(res => this.credentials$.next(res)));
    }

    getAccessToken(): Observable<string> {
        const oauthToken = this.getAccessData();
        return of(oauthToken ? oauthToken.access_token : null);
    }

    getTokenPayload(): Auth.TokenPayload {
        const oauthToken = this.getAccessData().access_token;
        return JWT(oauthToken) as Auth.TokenPayload;
    }

    getRoles(tokenPayload: Auth.TokenPayload) {
        return tokenPayload.realm_access.roles;
    }

    validateRoles(userRoles: string[], roles: Auth.RolesAccess): Observable<boolean> {
        userRoles = userRoles.map(x => x.toUpperCase());

        let authorized: boolean = true;

        if (roles.all.length !== 0) authorized = authorized && roles.all.map(x => x.toUpperCase()).every(r => userRoles.includes(r));

        if (roles.except.length !== 0)
            authorized = authorized && roles.except.map(x => x.toUpperCase()).every(r => !userRoles.includes(r));

        if (roles.in.length !== 0) authorized = authorized && roles.in.map(x => x.toUpperCase()).some(r => userRoles.includes(r));

        if (!authorized) {
            this.snackBar.open('Você não tem permissão nessa funcionalidade', 'OK');
        }

        return of(authorized);
    }

    getAccessData(): Auth.AccessData {
        const accessData: Auth.AccessData = JSON.parse(localStorage.getItem(sessionName));
        return accessData;
    }

    validateToken(token: string): Observable<boolean> {
        const url = `${environment.BASE_GATEWAY}/auth/validate`;

        const model = {
            token
        };

        return this.http.post<boolean>(url, model);
    }
}
