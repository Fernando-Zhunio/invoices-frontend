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
import { AuthService } from "../../services/auth.service";
import { HelperService } from "../../services/helper.service";

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
     const isAuthenticated = HelperService.isAuthenticated();
    // si estoy autenticado y es una ruta api o si no estoy autenticado y es una ruta de guest
    if ((isAuthenticated && !isGuest) || (!isAuthenticated && isGuest)) {
      return true;
    }
    this.authService.logout();
    return false;
  }
}
