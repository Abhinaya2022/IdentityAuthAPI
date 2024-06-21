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
import { ModalModule } from 'ngx-bootstrap/modal';
import { PagerComponent } from './pager/pager.component';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [
    PopupComponent,
    InputTextComponent,
    PagerComponent,
    PagingHeaderComponent,
  ],
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
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
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
    PagerComponent,
    PagingHeaderComponent,
  ],
})
export class SharedModule {}
