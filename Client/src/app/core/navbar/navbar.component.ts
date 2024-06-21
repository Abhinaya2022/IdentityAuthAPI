import { Component, TemplateRef, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/Models/Account/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  modalRef?: BsModalRef;
  user?: User;
  constructor(
    public service: AccountService,
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.service.updateCartValue();
    this.service.currentUser$.subscribe({
      next: (user) => {
        this.user = user!;
      },
    });
  }

  navbarMenus: any = [
    { name: 'Home', path: '' },
    { name: 'Courses', path: 'courses' },
    { name: 'Contact', path: 'career' },
  ];

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
}
