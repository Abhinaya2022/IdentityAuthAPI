import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.css'],
})
export class CoursesCardComponent {
  @Input('course') course: any;
  currentUser: any;
  constructor(
    private service: CoursesService,
    private _accountServ: AccountService
  ) {
    _accountServ.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
    });
  }
  addToCart(courseId: number) {
    this.service.addToCart(courseId, this.currentUser);
  }
}
