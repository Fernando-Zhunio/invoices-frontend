import { Injectable } from '@angular/core';
// import { Session } from '../clases/session';
import { NgxPermissionsService } from 'ngx-permissions';
import { Session } from '../interfaces/session';
import { User } from '../interfaces/user';
import { HelperService } from './helper.service';
// import { User } from '../shared/interfaces/user';
// import { Person } from '../shared/interfaces/person';
// import { fillUser, Token } from '../class/fast-data';

declare var require: any;
const CryptoJS = require('crypto-js');
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private session: Session | null = null;
  private permissions: string[] | null = null;

  constructor(private permissionsService: NgxPermissionsService,  private helperService: HelperService) {}

  saveSession(session: Session): void {
    this.session = session;
    localStorage.setItem('session', this.encryptedAes(JSON.stringify(session)));
    this.helperService.setUser(session.user);
    this.helperService.setToken(session.token);
  }

  setUser(user: User): void {
    const session: Session = this.session!;
    session.user = user;
    this.saveSession(session);
  }

  getSession(): Session {
    return this.session!;
  }

  getSessionLocalStorage(): Session | null {
    const dataConvert = this.decryptAes(localStorage.getItem('session'));
    if (dataConvert) {
      return JSON.parse(dataConvert) as Session;
    }
    return null;
  }

  getUser(): User {
    return this.session!.user;
  }

  setPermission(permissions: any[]) {
    localStorage.setItem('permissions', this.encryptedAes(JSON.stringify(permissions)));
    this.permissionsService.loadPermissions(permissions);
    this.permissions = permissions;
  }

  getPermissions(): string[] | null {
    return this.permissions || this.getPermissionsLocalStorage();
  }

  getPermissionsLocalStorage(): string[] | null {
    const dataConvert = this.decryptAes(localStorage.getItem('permissions'));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  getToken(): string {
    return this.session!.token;
  }

  getItemLocalStorage(key: string): any {
    const dataConvert = this.decryptAes(localStorage.getItem(key));
    if (dataConvert) {
      return JSON.parse(dataConvert);
    }
    return null;
  }

  setItemLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, this.encryptedAes(JSON.stringify(value)));
  }

  removeSession(): void {
    this.session = null;
    localStorage.clear();
    this.helperService.clearSession();
  }

  encryptedAes(text: string): string {
    return CryptoJS.AES.encrypt(text, 'fernando-zhunio-reyes').toString();
  }

  decryptAes(text: string | null): string | null {
    if (text) {
      return CryptoJS.AES.decrypt(text, 'fernando-zhunio-reyes').toString(CryptoJS.enc.Utf8);
    }
    return null;
  }
}





