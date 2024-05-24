import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  coursesList = [
    {
      id: 1,
      price: 299,
      img: 'https://via.placeholder.com/400x200?text=Course+1',
      name: 'Web Development Basics',
      description:
        'Learn the basics of web development with our comprehensive course.',
    },
    {
      id: 2,
      price: 499,
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

  constructor() {}

  getCourses(): Observable<any> {
    return of(this.coursesList);
  }

  getCourseById(id: number) {
    return of(this.coursesList.find((x) => x.id === id));
  }
}
