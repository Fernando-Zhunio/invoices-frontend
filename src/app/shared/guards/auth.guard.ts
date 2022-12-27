import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  // ActivatedRouteSnapshot,
  // RouterStateSnapshot,
  UrlTree,
  // Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { HelperService } from "../services/helper.service";
// import { PATH_LOGIN } from "../class/fast-data";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
     const  isGuest = next.data['guard'] === 'guest'; 
    if (HelperService.isAuthenticated() && !isGuest) {
      return true;
    }
    if (!HelperService.isAuthenticated() && isGuest) {
      return true;
    }
    this.authService.logout();
    return false;
  }
}
