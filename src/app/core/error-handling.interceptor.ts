import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  errors = {

  }
  constructor(private _toast: ToastrService, private _router : Router) { }

  // This interceptor for Error Handling 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if(error.status === 401 || error.status === 0 || error.status === 405){
            // console.log(401);
            localStorage.clear();
            this._router.navigateByUrl('')
            this._toast.error('','Session Expired')
          }else if (error.status === 500 || error.status === 502 || error.status === 400 || error.status === 404){
            // console.log(500,501);
            this._toast.error('', error.error.message)
          }
        }

        return throwError(error);

      })
    );
  }
}
