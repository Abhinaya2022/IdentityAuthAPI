import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  constructor(private _accountService: AccountService) {}
  ngOnInit(): void {
    this.laodCurrentUser();
  }

  laodCurrentUser() {
    let token = localStorage.getItem('token');
    this._accountService.loadCurrentUser(token).subscribe();
  }
}
