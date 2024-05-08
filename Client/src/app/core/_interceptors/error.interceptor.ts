import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _toastr: ToastrService, private _router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          if (error.error.statusCode === 400) {
            if (error.error.errors) {
              throw error.error;
            } else {
              this._toastr.error(
                error.error.message,
                error.error.statusCode.toString()
              );
            }
          }
          if (error.error.statusCode === 401) {
            this._toastr.error(
              error.error.message,
              error.error.statusCode.toString()
            );
          }
          if (error.error.statusCode === 404) {
            this._router.navigateByUrl('/not-found');
          }
          if (error.error.statusCode === 500) {
            const navigationExtras: NavigationExtras = {
              state: { error: error.error },
            };
            this._router.navigateByUrl('/server-error', navigationExtras);
          }
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
