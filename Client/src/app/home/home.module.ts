import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HomeComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent, FooterComponent],
})
export class HomeModule {}
