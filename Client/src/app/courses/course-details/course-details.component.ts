import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { AccountService } from 'src/app/account/account.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  courseId: number = 0;
  course?: {
    id: number;
    price: number;
    img: string;
    name: string;
    description: string;
  };
  user: any;
  constructor(
    private _route: ActivatedRoute,
    private _service: CoursesService,
    private _accountServ: AccountService,
    private _router: Router,
    private _bredCrumb: BreadcrumbService
  ) {
    this._accountServ.currentUser$.subscribe({
      next: (user) => (this.user = user),
    });
    _bredCrumb.set('@course', '');
  }

  ngOnInit(): void {
    this.courseId = +this._route.snapshot.params['id'];
    this.courseId && this.getCourse();
  }

  getCourse() {
    this._service.getCourseById(this.courseId).subscribe({
      next: (course) => {
        if (course) {
          this.course = course;
          this._bredCrumb.set('@course', course.name);
        }
      },
    });
  }

  enroll() {
    this._service.addToCart(this.courseId, this.user);
    this._router.navigateByUrl('/courses/courses-cart');
  }
}
