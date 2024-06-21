import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { CoursesService } from './courses/courses.service';
import { CookieService } from 'ngx-cookie-service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  user: any;
  constructor(
    private _accountService: AccountService,
    private _courseService: CoursesService,
    private _bredCrumbServ:BreadcrumbService
  ) {}
  ngOnInit(): void {
    this.laodCurrentUser();
    this._bredCrumbServ.set('Home/Course/Courses','Courses')
  }

  laodCurrentUser() {
    let token = localStorage.getItem('token');
    this._accountService.loadCurrentUser(token).subscribe({
      next: (user) => {
        this.user = user;
        this.loadCurrentCart();
      },
    });
  }

  loadCurrentCart() {
    this._courseService.loadCurrentCart(this.user.email);
  }
}
