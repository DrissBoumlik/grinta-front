import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {FeedbackService} from '../shared/feedback/feedback.service';

@Injectable()
export class HandlerHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private feedbackService: FeedbackService,
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
          if (err.status === 500) {
            const message = 'Une erreur interne s\'est produite';
            this.feedbackService.feedbackReceived.next({feedback: 'error', message});
            setTimeout(() => {
              this.router.navigate(['/error-server']);
            }, 1000);
          }
          if (err.status !== 401 || err.url.includes('register')) {
            return;
          }
          this.authService.isLogged = false;
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
