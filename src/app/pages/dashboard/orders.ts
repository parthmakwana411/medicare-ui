import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TimelineModule } from 'primeng/timeline';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, DataView, ButtonModule, DialogModule, TimelineModule],
  providers: [OrderService],
  template: `
    <div class="card">
      <p-dataview [value]="orders()">
        <ng-template #list let-items>
          <div class="grid grid-cols-12 gap-4">
            <div
              class="col-span-12"
              *ngFor="let order of items; let first = first"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-center p-4 gap-4 border-b border-surface-200 dark:border-surface-700"
              >
                <img
                  [src]="order.image"
                  [alt]="order.name"
                  class="w-16 h-16 object-contain rounded"
                />

                <div class="flex-1 flex flex-col md:flex-row justify-between">
                  <div>
                    <div class="font-semibold text-lg">
                      {{ order.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      Order ID: {{ order.id }}
                    </div>
                    <div class="text-sm text-gray-500">
                      Ordered on: {{ order.date }}
                    </div>
                    <div
                      class="mt-1 inline-block text-sm px-2 py-1 rounded-lg"
                      [ngClass]="{
                        'bg-green-100 text-green-700': order.status === 'Delivered',
                        'bg-blue-100 text-blue-700': order.status === 'Shipped',
                        'bg-yellow-100 text-yellow-700': order.status === 'Processing',
                        'bg-orange-100 text-orange-700': order.status === 'Out for Delivery'
                      }"
                    >
                      {{ order.status }}
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-2">
                    <span class="text-lg font-semibold">
                      ₹{{ order.price }}
                    </span>
                    <p-button
                      label="Track Order"
                      icon="pi pi-map-marker"
                      size="small"
                      (click)="openTracking(order)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </p-dataview>
    </div>

    <!-- Order Tracking Dialog -->
    <p-dialog
      header="Order Tracking"
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '25rem' }"
    >
      <p-timeline
        [value]="getTrackingSteps(selectedOrder?.status)"
        align="alternate"
        [style]="{ 'margin-left': '-10px' }"
      >
        <ng-template pTemplate="content" let-event>
          <span
            [ngClass]="{
              'text-green-600 font-semibold': event.done,
              'text-gray-500': !event.done
            }"
            >{{ event.label }}</span
          >
        </ng-template>
      </p-timeline>
    </p-dialog>
  `,
})
export class OrdersListComponent implements OnInit {
  orders = signal<any[]>([]);
  visible = false;
  selectedOrder: any;

  orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.getOrders().then((data) => {
      this.orders.set(data);
    });
  }

  openTracking(order: any) {
    this.selectedOrder = order;
    this.visible = true;
  }

  getTrackingSteps(status: string) {
    const allSteps = [
      'Order Placed',
      'Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered'
    ];

    const currentIndex = allSteps.indexOf(status);
    return allSteps.map((label, i) => ({
      label,
      done: i <= currentIndex
    }));
  }
}
