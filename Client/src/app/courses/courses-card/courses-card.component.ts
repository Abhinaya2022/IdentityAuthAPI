import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.css'],
})
export class CoursesCardComponent {
  @Input('course') course: any;
}
