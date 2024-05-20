import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const loginOrRegisterGuard: CanActivateFn = (_route, _state) => {
  let accountService = inject(AccountService);
  let router = inject(Router);

  return accountService.currentUser$.pipe(
    tap((auth) => {
      if (auth) {
        router.navigateByUrl('/');
      }
    }),
    map((auth) => !!!auth) // Transforming auth to a boolean value
  );
};
