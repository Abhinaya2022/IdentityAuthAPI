import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PopupComponent } from './popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { InputTextComponent } from './input-text/input-text.component';

@NgModule({
  declarations: [PopupComponent, InputTextComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
      autoDismiss: true,
      closeButton: true,
    }),
    RouterModule,
  ],
  exports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CarouselModule,
    PopupComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    InputTextComponent,
    RouterModule,
  ],
})
export class SharedModule {}
