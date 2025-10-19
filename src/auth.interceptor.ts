import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true; // If decoding fails, treat as expired
  }
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // 🔒 Check token expiration
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('token');
    router.navigate(['auth/login']);
    return throwError(() => new Error('Token expired'));
  }

  // 🪪 Attach token to headers
  const authReq = token ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 🚫 If unauthorized, clear token and redirect
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('token');
        router.navigate(['auth/login']);
      }
      return throwError(() => error);
    })
  );
};
