import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token')
    
    // debugger
    if(token){
      const tokenizeRequest = request.clone({
        headers:request.headers.set('Authorization','bearer '+token)
      })
      return next.handle(tokenizeRequest)
    }
    return next.handle(request);
  }
}
