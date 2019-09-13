export namespace Auth {

    export class Signin {
        usuario: string;
        senha: string;
    }

    export class AccessData {
        userId: string;
        name: string;
        email: string;
        access_token: string;
        expires_in: number;
        refresh_expires_in: number;
        refresh_token: string;
        token_type: string;
        session_state: string;
        scope: string;
    }

    export class RolesAccess {
        all: string[] = [];
        in: string[] = [];
        except: string[] = [];
    }

    export class TokenPayload {
        jti: string;
        exp: number;
        nbf: number;
        iat: number;
        iss: string;
        aud: string;
        sub: string;
        typ: string;
        azp: string;
        auth_time: number;
        session_state: string;
        acr: string;
        realm_access: {
            roles: string[];
        };
        scope: string;
        preferred_username: string;
        email: string;
    }

    export class ResponseData {
        active: boolean;
        jti: string;
        exp: number;
        nbf: number;
        iat: number;
        aud: string;
        typ: string;
        auth_time: number;
        acr: string;
    }


}
