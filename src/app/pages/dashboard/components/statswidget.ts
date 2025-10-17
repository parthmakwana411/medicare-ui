import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MedicareService } from '../../service/medicare.service';

@Component({
  selector: 'app-stats-widget',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  providers: [MessageService],
  template: `
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Orders</span>
            <div
              class="text-surface-900 dark:text-surface-0 font-medium text-xl cursor-pointer"
              (click)="goToOrders()"
            >
              {{ orders.length }}
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 text-xl!"></i>
          </div>
        </div>
        <span class="text-primary font-medium cursor-pointer" (click)="goToOrderDetails()">
          Click to view orders
        </span>
      </div>
    </div>
  `
})
export class StatsWidget implements OnInit {
  private medicareService = inject(MedicareService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  orders: any[] = [];

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.medicareService.getOrdersForAdmin().subscribe({
      next: (res) => (this.orders = res.orders || []),
      error: (err) => console.error('Failed to fetch orders', err)
    });
  }

  goToOrders() {
    this.router.navigate(['/admin/orders']); // Make sure this route exists
  }

  updateOrderStatus(order: any) {
    if (order.status === 'Order Placed') {
      this.medicareService.updateOrderStatus(order.order_id, 'Out for Delivery').subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: `Order ${order.order_id} is now Out for Delivery`,
            life: 3000
          });
          this.loadOrders(); // Refresh list
        },
        error: (err) => console.error('Failed to update order status', err)
      });
    }
  }

  sendOtp(order: any) {
    this.medicareService.sendDeliveryOtp(order.order_id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: `OTP sent for order ${order.order_id}`,
          life: 3000
        });
      },
      error: (err) => console.error('Failed to send OTP', err)
    });
  }

  verifyOtp(order: any, otp: string) {
    this.medicareService.verifyDelivery(order.order_id, otp).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: `Order ${order.order_id} verified successfully`,
          life: 3000
        });
        this.loadOrders(); // Refresh list
      },
      error: (err) => console.error('OTP verification failed', err)
    });
  }

  goToOrderDetails() {
    this.router.navigate(['/order-details']);
  }
}
