import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CareerComponent],
  imports: [CommonModule, SharedModule,FormsModule],
  exports: [CareerComponent],
})
export class CareerModule {}
