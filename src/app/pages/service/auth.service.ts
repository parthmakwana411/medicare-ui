import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'https://medis-hpahczf4h6fyaqcj.canadacentral-01.azurewebsites.net';

  constructor(private http: HttpClient) {}

  /** 1️⃣ Request OTP with phone number */
  requestOtp(phoneNumber: string): Observable<any> {
    const payload = { phoneNumber };
    return this.http.post(`${this.baseUrl}/request-otp`, payload)
      .pipe(catchError(this.handleError));
  }

  /** 2️⃣ Verify OTP with phone number and code */
  verifyOtp(phoneNumber: string, code: string): Observable<any> {
    const payload = { phoneNumber, code };
    return this.http.post(`${this.baseUrl}/verify-otp`, payload)
      .pipe(catchError(this.handleError));
  }

  /** 3️⃣ Send OTP using an identifier */
  send(identifier: string): Observable<any> {
    const payload = { identifier };
    return this.http.post(`${this.baseUrl}/send`, payload)
      .pipe(catchError(this.handleError));
  }

  /** 4️⃣ Verify OTP using identifier + otpCode */
  verify(identifier: string, otpCode: string): Observable<any> {
    const payload = { identifier, otpCode };
    return this.http.post(`${this.baseUrl}/verify`, payload)
      .pipe(catchError(this.handleError));
  }

  /** 🧠 Common error handler */
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMsg = 'Something went wrong. Please try again.';
    if (error.error?.message) errorMsg = error.error.message;
    return throwError(() => new Error(errorMsg));
  }
}
