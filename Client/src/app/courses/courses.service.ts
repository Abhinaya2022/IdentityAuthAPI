import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  cartValueSource = new BehaviorSubject<any[]>([]);
  $cartValue = this.cartValueSource.asObservable();

  coursesList = [
    {
      id: 1,
      price: 299.12,
      img: 'https://via.placeholder.com/400x200?text=Course+1',
      name: 'Web Development Basics',
      description:
        'Learn the basics of web development with our comprehensive course.',
    },
    {
      id: 2,
      price: 499.12,
      img: 'https://via.placeholder.com/400x200?text=Course+2',
      name: 'Mastering Angular',
      description: ' Master Angular and build dynamic web applications.',
    },
    {
      id: 3,
      price: 499,
      img: 'https://via.placeholder.com/400x200?text=Course+3',
      name: '.NET Core for Advanced',
      description: 'Deep dive into .NET Core and build robust APIs.',
    },
    {
      id: 4,
      price: 399,
      img: 'https://via.placeholder.com/400x200?text=Course+4',
      name: '.NET Core for Beginners',
      description:
        'Learn to build robust APIs with .NET Core. This course covers everything from the basics of .NET Core to more advanced topics like security and deployment.',
    },
  ];

  constructor(
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
    private _cookieService: CookieService
  ) {}

  loadCurrentCart(userName: string) {
    let cookiesCart = this.getCartFromCookies();
    let userCart = [];

    if (cookiesCart) {
      let userCartData = cookiesCart.find((c) => c.userName === userName);
      if (userCartData) {
        userCart = userCartData.cart;
      }
    }

    this.cartValueSource.next(userCart);
  }

  addToCart(courseId: number, user: any) {
    let currentCart = this.cartValueSource.getValue();
    let courseExists = currentCart.some((x) => x.id === courseId);

    if (courseExists) {
      this._toastr.info('Course is already in cart!');
    } else {
      this.getCourseById(courseId).subscribe({
        next: (course) => {
          if (course) {
            let updatedCart = [...currentCart, course];
            let cookiesCart = this.getCartFromCookies();
            let userCartIndex = cookiesCart.findIndex(
              (c) => c.userName === user.email
            );

            if (userCartIndex !== -1) {
              cookiesCart[userCartIndex].cart = updatedCart;
            } else {
              cookiesCart.push({
                userName: user.email,
                cart: updatedCart,
              });
            }

            this._cookieService.set(
              'currentCart',
              JSON.stringify(cookiesCart),
              undefined,
              '/'
            );
            this.cartValueSource.next(updatedCart);
          }
        },
        error: (err) => {
          this._toastr.error('Failed to add course to cart.');
          console.error(err);
        },
      });
    }
  }

  removeFromCart(course: any, userName: string) {
    let currentCart = this.cartValueSource.getValue();
    currentCart = currentCart.filter((c) => c.id !== course.id); // Use ID for comparison

    let cookiesCart = this.getCartFromCookies();
    let userCartIndex = cookiesCart.findIndex((c) => c.userName === userName);

    if (userCartIndex !== -1) {
      cookiesCart[userCartIndex].cart = currentCart;
      this._cookieService.set(
        'currentCart',
        JSON.stringify(cookiesCart),
        undefined,
        '/'
      );
    }

    this.cartValueSource.next(currentCart);
  }

  getCourses(page: number, itemsPerPage: number): Observable<any> {
    this._spinner.show();

    // Calculate the start and end indices for slicing the array
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the array to get the items for the current page
    const paginatedCourses = this.coursesList.slice(startIndex, endIndex);

    // Simulate a delay and then hide the spinner
    setTimeout(() => {
      this._spinner.hide();
    }, 1000);
    //return of(null);
    return of(paginatedCourses);
  }

  getCourseById(id: number) {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    }, 1000);
    return of(this.coursesList.find((x) => x.id === id));
  }

  private getCartFromCookies(): any[] {
    const cartJson = this._cookieService.get('currentCart');
    return cartJson ? JSON.parse(cartJson).flat() : [];
  }
}
