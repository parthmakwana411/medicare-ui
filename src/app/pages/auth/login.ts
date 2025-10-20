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
import { MedicareService } from '../service/medicare.service';

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
    providers: [MessageService, MedicareService],
    styles: `
        ::ng-deep .p-inputtext {
            border: 1px grey solid;
        }
    `,
    template: `
        <div class="flex items-center justify-center min-h-screen bg-white px-4">
            <div class="bg-white rounded-3xl w-full max-w-sm text-center flex flex-col justify-center">
                <p-toast />

                @if (step() === 'login') {
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/pandemic-delivery-service-illustration-svg-download-png-8608641.png" alt="Login" class="mx-auto mb-6 w-64" />
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
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-girl-is-delivering-packages-illustration-svg-download-png-8608639.png" alt="otp" class="mx-auto mb-6 w-64" />
                    <h3 class="text-2xl font-semibold mb-2">Enter Verification Code</h3>
                    <p class="text-gray-500 mb-6">OTP sent to +91 {{ phone }}</p>

                    <div class="mb-6 card flex justify-center p-0">
                        <p-inputotp [(ngModel)]="otp" size="large" [length]="6" inputmode="numeric" />
                    </div>

                    <p-button label="Verify" [disabled]="!otp || otp.toString().length !== 6" styleClass="w-full" (click)="verifyOtp()"></p-button>

                    <!-- Resend & Change number -->
                    <div class="text-center mt-4 flex flex-col gap-2">
                        <a href="#" class="text-blue-600 hover:underline" (click)="resendOtp($event)">Resend OTP</a>
                        <a href="#" class="text-gray-600 hover:underline" (click)="changeNumber($event)">Change Number</a>
                    </div>
                }
            </div>
        </div>
    `
})
export class Login {
    private router = inject(Router);
    private authService = inject(MedicareService);
    private messageService = inject(MessageService);

    step = signal<'login' | 'otp'>('login');
    phone: string = '';
    otp: string = '';

    sendOtp() {
        if (!this.phone || this.phone.length !== 10) {
            this.showMessage('Enter a valid 10-digit mobile number', 'error');
            return;
        }

        const fullPhone = `+91${this.phone}`;

        // Admin bypass
        if (this.phone === '1111111111') {
            this.showMessage('Admin detected! Enter OTP', 'success');
            this.step.set('otp');
            return;
        }

        this.authService.sendOtp(fullPhone).subscribe({
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

        const fullPhone = `+91${this.phone}`;

        // Admin bypass
        if (this.phone === '1111111111' && this.otp === '111111') {
            this.showMessage('Admin login successful!', 'success');
            this.router.navigate(['/admin-dashboard']);
            return;
        }

        this.authService.verifyOtp(fullPhone, this.otp).subscribe({
            next: (res: any) => {
                if (res.access_token) localStorage.setItem('token', res.access_token);
                this.showMessage('OTP verified successfully!', 'success');
                this.router.navigate(['/']);
            },
            error: () => this.showMessage('Invalid OTP, please try again', 'error')
        });
    }

    resendOtp(event: Event) {
        event.preventDefault();

        const fullPhone = `+91${this.phone}`;
        this.authService.sendOtp(fullPhone).subscribe({
            next: () => this.showMessage('OTP resent successfully!', 'success'),
            error: () => this.showMessage('Failed to resend OTP', 'error')
        });
    }

    changeNumber(event: Event) {
        event.preventDefault();
        this.otp = '';
        this.step.set('login');
    }

    private showMessage(summary: string, severity: 'success' | 'error') {
        setTimeout(() => {
            this.messageService.add({ severity, summary, life: 3000 });
        });
    }
}
