import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesCartComponent } from './courses-cart/courses-cart.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
    data: { breadcrumb: 'courses' },
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
    data: { breadcrumb: { alias: 'course' } },
  },
  {
    path: 'courses-cart',
    component: CoursesCartComponent,
    data: { breadcrumb: 'course cart' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
