import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('============= guard =============');
    console.log(this.authService);
    console.log(this.authService.user);
    console.log(this.authService.isLogged);
    if (!this.authService.isLogged) {
      this.authService.logout({serverSide: false});
    }
    return this.authService.isLogged;
  }
}
