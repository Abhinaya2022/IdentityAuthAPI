import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const loginOrRegisterGuard: CanActivateFn = (route, state) => {
  let accoutService = inject(AccountService);
  let router = inject(Router);

  return accoutService.user$.pipe(
    map((auth) => {
      if (auth) {
        router.navigateByUrl('/home');
        return false;
      } else {
        return true;
      }
    })
  );
};
