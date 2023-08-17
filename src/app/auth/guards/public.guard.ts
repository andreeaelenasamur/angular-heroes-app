import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthStatusPublic = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated public:', isAuthenticated)),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map( isAuthenticated => !isAuthenticated)
    );
};

  export const canMatchGuardPublic: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean | Observable<boolean> => {

    return checkAuthStatusPublic();
  };

  export const canActivateGuardPublic: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {

    return checkAuthStatusPublic();
  }


