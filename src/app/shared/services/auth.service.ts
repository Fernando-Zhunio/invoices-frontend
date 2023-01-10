import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/modules/authentication/interfaces/auth-response';
import { environment } from 'src/environments/environment';
import { PATH_HOME, PATH_LOGIN } from '../constants/authenticated';
import { Session } from '../interfaces/session';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  logout(canPass: boolean = false): void {
    // this.storageService.removeSession();
    // this.activatedRoute.data.subscribe(res => {
    //   if (res?.['guard'] != 'guest' || canPass) {
    //     this.router.navigate([PATH_LOGIN]);
    //   }
    // })
  }

   login({ email, password }: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.serverUrlApi + 'auth/login', { email, password }) 
  }

   register({ name, email, password }: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.serverUrlApi + 'auth/register', { name, email, password })
      
  }



  
}
