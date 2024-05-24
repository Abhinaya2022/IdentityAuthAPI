import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'courses-list',
    component: CoursesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
