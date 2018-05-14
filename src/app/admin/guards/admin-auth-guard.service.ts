import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const tokenPayload = this.auth.getUserDetails();
    if (
     tokenPayload.admin !== expectedRole
    ) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.canActivate(childRoute, state);
  }
}
