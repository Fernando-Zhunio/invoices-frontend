import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  private static user: User | null = null;
  private static token: string | null = null;

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
    return this.user !== null && this.token !== null;
  }

  public clearSession(): void {
    HelperService.user = null;
    HelperService.token = null;
  }

}
