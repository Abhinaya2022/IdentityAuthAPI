import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesCartComponent } from './courses-cart/courses-cart.component';

const routes: Routes = [
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'courses-list',
    component: CoursesListComponent,
  },
  {
    path: 'courses-cart',
    component: CoursesCartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
