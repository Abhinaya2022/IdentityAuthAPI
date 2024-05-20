import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})
export class CareerComponent {
  formData = {
    name: '',
    email: '',
    message: '',
  };

  email:string = ''

  submitForm() {
    // Handle form submission logic here
    console.log(this.formData);
  }
}
