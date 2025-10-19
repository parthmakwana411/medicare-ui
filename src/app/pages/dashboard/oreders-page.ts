import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog'; // For popup
import { MedicareService } from '../service/medicare.service';

@Component({
    selector: 'app-orders-page',
    standalone: true,
    imports: [CommonModule, ButtonModule, InputTextModule, InputOtpModule, FormsModule, DialogModule],
    providers: [MessageService],
    template: `
        <div class="flex flex-wrap gap-4">
            <div *ngFor="let order of orders" class="card p-4 w-full border shadow-md">
                <h5 class="text-lg font-semibold mb-2">Order ID: {{ order?.order_id }}</h5>
                <p><strong>Deliver to: </strong> {{ order?.user?.name }}</p>
                <p><strong>Phone: </strong> {{ order?.user?.phone }}</p>
                <p><strong>Status: </strong> {{ order?.status }}</p>
                <p><strong>Delivery Address: </strong> {{ order?.user?.address }}</p>
                <p><strong>Order Time: </strong> {{ order?.created_at | date: 'short' }}</p>

                <div class="flex flex-col gap-2 mt-4">
                    <!-- Out for Delivery button -->
                    <button *ngIf="order.status === 'Order Placed'" pButton type="button" label="Out for Delivery" class="p-button-sm p-button-warning" (click)="markOutForDelivery(order)"></button>

                    <!-- Send OTP button -->
                    <button *ngIf="order.status === 'Out of Delivery'" pButton type="button" label="Send OTP" class="p-button-sm p-button-info" (click)="openOtpDialog(order)"></button>
                </div>
            </div>
        </div>

        <!-- OTP Popup -->
        <p-dialog header="Enter OTP" [(visible)]="showOtpDialog" [modal]="true" [closable]="false">
            <div class="flex flex-col gap-3">
                <!-- OTP Input -->
                <div class="w-full">
                    <p-inputotp size="large" [length]="6" inputmode="numeric" [(ngModel)]="currentOtp" />
                </div>

                <!-- Verify Button Full Width -->
                <div class="w-full lex flex-col sm:flex-row gap-3">
                    <button pButton type="button" label="Resend OTP" class="p-button-secondary flex-1" (click)="resendOtp(currentOrder)"></button>
                    <button pButton type="button" label="Verify" class="p-button-success w-full" (click)="verifyOtp(currentOrder)"></button>
                </div>
            </div>
        </p-dialog>
    `
})
export class OrdersPageComponent implements OnInit {
    private medicareService: MedicareService = inject(MedicareService);
    private messageService: MessageService = inject(MessageService);

    orders: any[] = [];
    otpMap: any = {};

    showOtpDialog = false;
    currentOrder: any = null;
    currentOtp: string = '';

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders(): void {
        this.medicareService.getOrdersForAdmin().subscribe({
            next: (res) => {
                this.orders = res.orders || [];
            },
            error: (err) => {
                console.error('Failed to fetch orders', err);
                this.messageService.add({ severity: 'error', summary: 'Failed to load orders', life: 3000 });
            }
        });
    }

    markOutForDelivery(order: any): void {
        this.medicareService.updateOrderStatus(order.order_id, 'Out of Delivery').subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Order ${order.order_id} Out of Delivery`,
                    life: 3000
                });
                this.loadOrders();
            },
            error: (err) => {
                console.error('Failed to update order status', err);
                this.messageService.add({ severity: 'error', summary: 'Failed to update status', life: 3000 });
            }
        });
    }

    openOtpDialog(order: any): void {
        this.currentOrder = order;
        this.currentOtp = '';
        this.showOtpDialog = true;

        // Call send OTP API
        this.medicareService.sendDeliveryOtp(order.order_id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: `OTP sent for order ${order.order_id}`,
                    life: 3000
                });
            },
            error: (err) => {
                console.error('Failed to send OTP', err);
                this.messageService.add({ severity: 'error', summary: 'Failed to send OTP', life: 3000 });
            }
        });
    }

    resendOtp(order: any): void {
        if (!order) return;

        this.medicareService.sendDeliveryOtp(order.order_id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: `OTP resent for order ${order.order_id}`,
                    life: 3000
                });
            },
            error: (err) => {
                console.error('Failed to resend OTP', err);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed to resend OTP',
                    life: 3000
                });
            }
        });
    }

    verifyOtp(order: any): void {
        if (!this.currentOtp) {
            this.messageService.add({ severity: 'warn', summary: 'Enter OTP first', life: 2000 });
            return;
        }

        this.medicareService.verifyDelivery(order.order_id, this.currentOtp).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Order ${order.order_id} verified successfully`,
                    life: 3000
                });
                this.showOtpDialog = false;
                this.loadOrders(); // reload orders after OTP verification
            },
            error: (err) => {
                console.error('OTP verification failed', err);
                this.messageService.add({ severity: 'error', summary: 'OTP verification failed', life: 3000 });
            }
        });
    }
}
