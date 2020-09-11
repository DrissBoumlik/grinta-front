import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthService} from '../Auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class HandlerHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const token = localStorage.getItem('token');
    if (authUser && token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.authService.logout({serverSide: false});
        }
      }));

    // return next.handle(req).pipe(
    //   catchError((error: any) => {
    //     console.log(error);
    //     if (error.status === 401) {
    //       this.authService.logout();
    //     }
    //     return throwError(error);
    //   })
    // );
  }
}
