import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class LoginedGuards implements CanActivate {
  sub!: Subscription;
  constructor(private userState: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let res = false;
    this.sub = this.userState.isAuth.subscribe((x) => {
      if (!!x) {
        void this.router.navigateByUrl('/projects');
        return (res = false);
         
      } else {
         

        return (res = true);
      }
    });

    return res;
  }
}
