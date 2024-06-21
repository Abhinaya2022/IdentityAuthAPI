import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, NgxSpinnerModule, SharedModule],
  exports: [NavbarComponent, NgxSpinnerModule],
})
export class CoreModule {}
