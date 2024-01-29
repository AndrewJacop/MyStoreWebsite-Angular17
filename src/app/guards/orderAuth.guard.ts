import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserAuthService } from '../services/UserAuth.service';

export const orderAuthGuard: CanActivateFn = (route, state) => {
  let userAuthService = inject(UserAuthService);
  let router = inject(Router);
  if (userAuthService.isLoggedIn) {
    return true;
  } else {
    userAuthService.redirectUrl = state.url;
    alert(
      'You need to be logged in to access the products page!, you will be directed Shortly...'
    );
    router.navigate(['/home/login']);
    return false;
  }
};
