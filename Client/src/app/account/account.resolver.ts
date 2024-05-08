import { map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AccountService } from './account.service';

export const accountResolver: ResolveFn<boolean> = (route, state) => {
  let accountService = inject(AccountService);
  let cookieService = inject(CookieService);
  let token = cookieService.get('token');
  if (!token) return false;

  return accountService.loadCurrentUser(token).pipe(
    map((auth) => {
      if (auth) return true;
      else {
        return false;
      }
    })
  );
};
