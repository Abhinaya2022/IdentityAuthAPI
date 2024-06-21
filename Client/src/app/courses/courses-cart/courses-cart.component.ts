import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-courses-cart',
  templateUrl: './courses-cart.component.html',
  styleUrls: ['./courses-cart.component.css'],
})
export class CoursesCartComponent {
  cartCourses: any[] = [];
  userName: string = '';
  constructor(
    private _service: CoursesService,
    private _accountServ: AccountService
  ) {
    _service.$cartValue.subscribe((cartCourses) => {
      this.cartCourses = cartCourses;
    });

    _accountServ.currentUser$.subscribe({
      next: (user) => {
        if (user) this.userName = user.email;
      },
    });
  }

  removeFromCart(course: any) {
    this._service.removeFromCart(course, this.userName);
  }

  getTotal() {
    return this.cartCourses.reduce((total, course) => total + course.price, 0);
  }

  checkout() {
    // Implement checkout logic here
    alert('Proceeding to checkout');
  }
}
