import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumber } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { InputOtp } from 'primeng/inputotp';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, RouterModule, InputGroupModule, InputGroupAddonModule, InputNumber, Toast, InputOtp],
    providers: [MessageService],
    template: `
        <div class="flex items-center justify-center min-h-screen bg-white">
            <div class="bg-white rounded-3xl w-full max-w-sm text-center flex flex-col justify-center">
                @if (step() === 'login') {
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/pandemic-delivery-service-illustration-svg-download-png-8608641.png" alt="Login" class="mx-auto mb-6 w-100" />
                    <h2 class="text-2xl font-semibold mb-2">Lets Get Started</h2>
                    <p class="text-gray-500 mb-6"></p>
                    <p-toast />
                    <div class="mb-6">
                        <p-inputgroup>
                            <p-inputgroup-addon>
                                <i class="pi pi-phone"></i>
                            </p-inputgroup-addon>
                            <p-inputnumber [(ngModel)]="phone" mode="decimal" size="large" placeholder="Enter mobile number" inputId="withoutgrouping" [useGrouping]="false" />
                        </p-inputgroup>
                    </div>

                    <p-button label="Next" styleClass="w-full" (click)="sendOtp()"></p-button>
                } @else {
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/delivery-girl-is-delivering-packages-illustration-svg-download-png-8608639.png" alt="otp" class="mx-auto mb-6 w-100" />
                    <h3 class="text-2xl font-semibold mb-2">Enter verification code</h3>
                    <p class="text-gray-500 mb-6"></p>
                    <p-toast />
                    <div class="mb-6 card flex justify-center" style="padding: 0;">
                        <p-inputotp [(ngModel)]="otp" size="large" [length]="6" />
                    </div>

                    <p-button label="Verify" [disabled]="otp?.toString()?.length !== 6" styleClass="w-full" (click)="verifyOtp()"></p-button>
                }
            </div>
        </div>
    `
})
export class Login {
    constructor(
        private router: Router,
        private authserice: AuthService
    ) {}

    messageService = inject(MessageService);

    step = signal<'login' | 'otp'>('login');
    phone: number | null = null;
    otp: number | null = null;

    sendOtp() {
        const phone = (this.phone ?? '').toString();
        if (phone?.length !== 10) {
            this.messageService.add({ summary: 'Enter valid mobile number', severity: 'error', life: 3000 });
            return;
        } else if (phone?.length == 10) {
            this.authserice.requestOtp(phone).subscribe({
                next: () => {
                    this.messageService.add({ summary: 'OTP Set to your mobile number!', severity: 'success', life: 3000 });
                    this.step.set('otp');
                },

                error: (err) => this.messageService.add({ summary: 'Please Try again some time', severity: 'error', life: 3000 })
            });
        }
    }

    verifyOtp() {
        const phone = (this.phone ?? '').toString();
        const otp = (this.otp ?? '').toString();

        if (otp?.length == 6) {
            this.authserice.verifyOtp(phone, otp).subscribe({
                next: () => {
                    this.messageService.add({ summary: 'OTP Verified!', severity: 'success', life: 3000 });
                    this.router.navigate(['/']);
                },

                error: (err) => this.messageService.add({ summary: 'Please Try again some time', severity: 'error', life: 3000 })
            });
        }
        else {
           this.messageService.add({ summary: 'Enter valid code', severity: 'error', life: 3000 }) 
        }
    }
}
