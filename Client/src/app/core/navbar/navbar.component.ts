import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public service: AccountService) {}

  navbarMenus: any = [
    { name: 'Home', path: 'home' },
    { name: 'Career', path: 'career' },
  ];
}
