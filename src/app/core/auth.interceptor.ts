import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  // This is interceptor for sending Authorization Token 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)
    if(currentUser){
      request = request.clone({
        headers:request.headers.set('Authorization',currentUser.token)
      })
      return next.handle(request)
    }
    return next.handle(request);
  }
}
