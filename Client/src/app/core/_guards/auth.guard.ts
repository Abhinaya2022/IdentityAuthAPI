import { map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';

export const authGuard: CanActivateFn = (_route, state) => {
  let accountService = inject(AccountService);
  let router = inject(Router);

  return accountService.currentUser$.pipe(
    tap((auth) => {
      if (!auth) {
        router.navigate(['/account/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
    }),
    map((auth) => !!auth) // Transforming auth to a boolean value
  );
};
