import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  courses: [] = [];
  constructor(private _service: CoursesService) {}
  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this._service.getCourses().subscribe({
      next: (courses) => {
        if (courses) {
          this.courses = courses;
        }
      },
    });
  }
}
