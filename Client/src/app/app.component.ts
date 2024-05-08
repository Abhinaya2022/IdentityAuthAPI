import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private _accountService: AccountService,
    private _cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.laodCurrentUser();
  }

  laodCurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) token = this._cookieService.get('token');
    if (token) {
      this._accountService.loadCurrentUser(token)?.subscribe();
    }
  }
}
