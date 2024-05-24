import { Component, TemplateRef } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  modalRef?: BsModalRef;
  constructor(
    public service: AccountService,
    private modalService: BsModalService
  ) {}

  navbarMenus: any = [
    { name: 'Home', path: '' },
    { name: 'Courses', path: 'course/courses-list' },
    { name: 'Contact', path: 'career' },
  ];

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
