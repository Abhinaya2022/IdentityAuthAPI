import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/Models/Account/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = environment.baseUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  user$ = this.currentUserSource.asObservable();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _cookieService: CookieService
  ) {}

  login(user: any) {
    return this._http.post<User>(this.url + 'login', user).pipe(
      map((user: any) => {
        if (user) {
          if (user.token) {
            this.setUserToLocalStorage(user);
            this.currentUserSource.next(user);
            this._cookieService.set('token', user.token, {
              expires: 30,
            });
            return user;
          } else {
            return null;
          }
        }
      })
    );
  }

  loadCurrentUser(token: string | null) {
    if (token === null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this._http
      .get<User>(this.url + 'api/account', { headers: headers })
      .pipe(
        map((user: User) => {
          if (user) {
            this.currentUserSource.next(user);
            this.setUserToLocalStorage(user);
            this._cookieService.set('token', user.token, {
              expires: 30,
            });
            return user;
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    localStorage.clear();
    this.currentUserSource.next(null);
    this._cookieService.set('token', '', {
      expires: 30,
    });
    this._router.navigate(['/account/login']);
  }

  register(registerDto: any) {
    return this._http.post<User>(this.url + 'register', registerDto).pipe(
      map((user: any) => {
        if (user) {
          if (user.token) {
            this.setUserToLocalStorage(user);
            this.currentUserSource.next(user);
            this._cookieService.set('token', user.token, {
              expires: 30,
            });
            return user;
          } else {
            return null;
          }
        }
      })
    );
  }

  setUserToLocalStorage(user: User) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('email', user.email ?? '');
    localStorage.setItem('displayName', user.displayName ?? '');
  }
}
