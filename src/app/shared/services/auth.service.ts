import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH_HOME, PATH_LOGIN } from '../constants/authenticated';
import { Session } from '../interfaces/session';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService, private router: Router, private activatedRoute: ActivatedRoute) { }


  logout(canPass: boolean = false): void {
    this.storageService.removeSession();
    this.activatedRoute.data.subscribe(res => {
      if (res?.['guard'] != 'guest' || canPass) { 
        this.router.navigate([PATH_LOGIN]);
      }
    })
  }

  login(session: Session): void {
    this.storageService.setSession(session);
    this.router.navigate([PATH_HOME]);
  }
}
