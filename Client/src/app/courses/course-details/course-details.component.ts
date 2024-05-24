import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';

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
  constructor(
    private _route: ActivatedRoute,
    private _service: CoursesService
  ) {}

  ngOnInit(): void {
    this.courseId = +this._route.snapshot.params['id'];
    this.courseId && this.getCourse();
  }

  getCourse() {
    this._service.getCourseById(this.courseId).subscribe({
      next: (course) => {
        if (course) {
          this.course = course;
        }
      },
    });
  }
}
