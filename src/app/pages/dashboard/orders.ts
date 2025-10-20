import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';
import { MedicareService } from '../service/medicare.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, TimelineModule],
  providers: [MedicareService],
  template: `
    <div class="grid grid-cols-1 gap-6">
      <div *ngFor="let order of orders()" class="card p-4 shadow-md rounded-lg border border-gray-200">
        <!-- Order Header -->
        <div class="flex justify-between items-center mb-4">
          <span class="text-lg font-semibold">Order ID: {{ order.id || '-' }}</span>
          <span class="px-3 py-1 rounded-full text-sm font-medium"
            [ngClass]="{
              'bg-green-100 text-green-700': order.status === 'Delivered',
              'bg-blue-100 text-blue-700': order.status === 'Shipped',
              'bg-yellow-100 text-yellow-700': order.status === 'Processing',
              'bg-orange-100 text-orange-700': order.status === 'Out of Delivery',
              'bg-gray-100 text-gray-700': order.status === 'Order Placed'
            }">
            {{ order.status }}
          </span>
        </div>

        <!-- Order Items -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div *ngFor="let item of order.items" class="flex items-center gap-4 border-b pb-2 last:border-b-0">
            <img [src]="getProductImage(item.id)" alt="{{ item.name }}" class="w-16 h-16 object-contain rounded" />
            <div class="flex-1 flex flex-col justify-between">
              <span class="font-medium">{{ item.name }}</span>
              <span class="text-gray-500 text-sm">Qty: {{ item.qty }}</span>
            </div>
            <span class="font-semibold text-lg">₹{{ item.price * item.qty }}</span>
          </div>
        </div>

        <!-- Order Total & Track -->
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">Total: ₹{{ order.total }}</span>
          <button pButton label="Track Order" icon="pi pi-map-marker" size="small" (click)="openTracking(order)"></button>
        </div>
      </div>
    </div>

    <!-- Order Tracking Dialog -->
    <p-dialog
      header="Order Tracking"
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '25rem' }">
      <p-timeline
        [value]="getTrackingSteps(selectedOrder?.status)"
        align="alternate"
        [style]="{ 'margin-left': '-10px' }">
        <ng-template pTemplate="content" let-event>
          <span [ngClass]="{ 'text-green-600 font-semibold': event.done, 'text-gray-500': !event.done }">
            {{ event.label }}
          </span>
        </ng-template>
      </p-timeline>
    </p-dialog>
  `,
})
export class OrdersListComponent implements OnInit {
  orders = signal<any[]>([]);
  products = signal<any[]>([]);
  visible = false;
  selectedOrder: any;

  private service = inject(MedicareService);

  async ngOnInit() {
    try {
      // Fetch products first for image mapping
      const prodResp = await firstValueFrom(this.service.getProducts());
      this.products.set(prodResp.products || []);

      // Fetch orders
      const orderResp = await firstValueFrom(this.service.getOrders());
      const ordersWithImages = (orderResp.orders || []).map((order: any) => ({
        ...order,
        items: order.items.map((item: any) => ({
          ...item,
          image: this.getProductImage(item.id)
        }))
      }));
      this.orders.set(ordersWithImages);
    } catch (error) {
      console.error('Failed to fetch orders or products', error);
    }
  }

  getProductImage(productId: string) {
    const product = this.products().find((p: any) => p.id == productId);
    return product?.image || 'https://via.placeholder.com/80';
  }

  openTracking(order: any) {
    this.selectedOrder = order;
    this.visible = true;
  }

  getTrackingSteps(status: string) {
    const allSteps = ['Order Placed','Out of Delivery', 'Delivered'];
    const currentIndex = allSteps.indexOf(status);
    return allSteps.map((label, i) => ({ label, done: i <= currentIndex }));
  }
}
