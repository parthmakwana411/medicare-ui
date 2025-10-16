import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    InputGroupModule,
    InputGroupAddonModule,
    ToastModule,
    InputOtpModule
  ],
  providers: [MessageService],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-white px-4">
      <div class="bg-white rounded-3xl w-full max-w-sm text-center flex flex-col justify-center">
        <p-toast />

        @if (step() === 'login') {
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/pandemic-delivery-service-illustration-svg-download-png-8608641.png"
            alt="Login"
            class="mx-auto mb-6 w-64"
          />
          <h2 class="text-2xl font-semibold mb-2">Let’s Get Started</h2>
          <p class="text-gray-500 mb-6">Enter your mobile number to continue</p>

          <div class="mb-6">
            <p-inputgroup>
              <p-inputgroup-addon>
                <i class="pi pi-phone"></i>
              </p-inputgroup-addon>
              <input
                type="tel"
                maxlength="10"
                pattern="[0-9]*"
                inputmode="numeric"
                [(ngModel)]="phone"
                placeholder="Enter mobile number"
                class="p-inputtext p-component w-full"
              />
            </p-inputgroup>
          </div>

          <p-button label="Next" styleClass="w-full" (click)="sendOtp()"></p-button>
        } @else {
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-girl-is-delivering-packages-illustration-svg-download-png-8608639.png"
            alt="otp"
            class="mx-auto mb-6 w-64"
          />
          <h3 class="text-2xl font-semibold mb-2">Enter Verification Code</h3>
          <p class="text-gray-500 mb-6">OTP sent to +91 {{ phone }}</p>

          <div class="mb-6 card flex justify-center p-0">
            <p-inputotp [(ngModel)]="otp" size="large" [length]="6" inputmode="numeric" />
          </div>

          <p-button
            label="Verify"
            [disabled]="!otp || otp.toString().length !== 6"
            styleClass="w-full"
            (click)="verifyOtp()"
          ></p-button>

          <div class="text-center mt-4">
            <a href="#" class="text-blue-600 hover:underline" (click)="resend($event)">Resend / Change Number</a>
          </div>
        }
      </div>
    </div>
  `
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  step = signal<'login' | 'otp'>('login');
  phone: string = '';
  otp: string = '';

  sendOtp() {
    if (!this.phone || this.phone.length !== 10) {
      this.showMessage('Enter a valid 10-digit mobile number', 'error');
      return;
    }

    this.authService.requestOtp(this.phone).subscribe({
      next: () => {
        this.showMessage('OTP sent to your mobile number!', 'success');
        this.step.set('otp');
      },
      error: () => this.showMessage('Please try again later', 'error')
    });
  }

  verifyOtp() {
    if (!this.otp || this.otp.length !== 6) {
      this.showMessage('Enter a valid 6-digit OTP', 'error');
      return;
    }

    this.authService.verifyOtp(this.phone, this.otp).subscribe({
      next: () => {
        this.showMessage('OTP verified successfully!', 'success');
        this.router.navigate(['/']);
      },
      error: () => this.showMessage('Invalid OTP, please try again', 'error')
    });
  }

  resend(event: Event) {
    event.preventDefault();
    this.otp = '';
    this.phone = '';
    this.step.set('login');
  }

  private showMessage(summary: string, severity: 'success' | 'error') {
    // Ensures p-toast is initialized before calling
    setTimeout(() => {
      this.messageService.add({ severity, summary, life: 3000 });
    });
  }
}
