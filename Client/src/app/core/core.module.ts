import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [NavbarComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    BreadcrumbModule,
    SharedModule,
  ],
  exports: [NavbarComponent, NgxSpinnerModule, SectionHeaderComponent],
})
export class CoreModule {}
