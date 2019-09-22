import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.auth.getToken()) {
      //console.log('TokenInterceptor.logged in');
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }else{
      //console.log('TokenInterceptor.NOT logged in');
    }
    return next.handle(request);
  }
}
