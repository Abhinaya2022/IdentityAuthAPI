import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesCardComponent } from './courses-card/courses-card.component';
import { CoursesCartComponent } from './courses-cart/courses-cart.component';

@NgModule({
  declarations: [
    CourseDetailsComponent,
    CoursesListComponent,
    CoursesCardComponent,
    CoursesCartComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
