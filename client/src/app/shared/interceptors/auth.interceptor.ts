import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req;
        if (this.authService.isAuthenticated()) {
            request = req.clone({
                setHeaders: {
                    Authorization: this.authService.getToken()
                }
            });
        }
        return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => this.handleAuthError(err))
            );
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login'], { queryParams: { sessionFailed: true } });
        }
        return throwError(err);
    }
}
