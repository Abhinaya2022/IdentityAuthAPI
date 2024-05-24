import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public account: AccountService) { };
  slideParams = [
    {
      img: 'assets/images/E-BRMS.webp',
      heading: 'Electronic Batch Record Manufacturing Sysytem',
      para: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      link: 'http://172.16.5.167/EBIMS/Home/',
    },
    {
      img: 'assets/images/background3.jpg',
      heading: 'Second slide label',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      img: 'assets/images/background2.avif',
      heading: 'Third slide label',
      para: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
    },
  ];
}
