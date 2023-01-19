import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/modules/authentication/interfaces/auth-response';
import { Session } from '../interfaces/session';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  private static user: User | null = null;
  private static token: string | null = null;

  public static disabledLoaderInterceptor = false;

  public static User(): any {
    return this.user;
  }

  public setUser(user: User): void {
    HelperService.user = user;
  }

  public static Token(): string | null {
    return this.token;
  }

  public setToken(token: string): void {
    HelperService.token = token;
  }

  public static isAuthenticated(): boolean {
    return HelperService.user !== null && HelperService.token !== null;
  }

  public clearSession(): void {
    HelperService.user = null;
    HelperService.token = null;
  }

  public static convertAuthResponseToSession(authResponse: AuthResponse): Session {
    return {
      token: authResponse.data.token,
      user: {
        name: authResponse.data.name,
        email: authResponse.data.email,
      },
      expiration: authResponse.data.expiration,
    };
  }

}
