import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerComponent } from './career.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CareerComponent],
  imports: [CommonModule, SharedModule],
  exports: [CareerComponent],
})
export class CareerModule {}
