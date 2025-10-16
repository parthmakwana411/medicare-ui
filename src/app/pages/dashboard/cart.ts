import { Component, inject, OnInit, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MedicareService } from '../service/medicare.service';
import { InputNumber } from 'primeng/inputnumber';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

@Component({
    selector: 'cart',
    standalone: true,
    providers: [MessageService],
    imports: [DrawerModule, ButtonModule, FileUploadModule, CommonModule, InputNumber, FormsModule],
    template: `
        <div class="card flex justify-center">
            <p-drawer [(visible)]="visible" position="full" (onHide)="onDrawerClose()">
                <!-- Header -->
                <ng-template #header>
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-xl">Cart</span>
                    </div>
                </ng-template>

                <!-- Products -->
                <div class="col-span-12 xl:col-span-12" style="margin-top: 1rem;">
                    <ng-container *ngIf="cartItems().length > 0; else emptyCart">
                        <div *ngFor="let item of cartItems()" class="flex justify-between items-center p-2 border rounded mb-2">
                            <div class="flex items-center gap-2">
                                <img [src]="item.image" alt="{{ item.name }}" class="w-12 h-12 rounded" />
                                <div>
                                    <div class="font-medium">{{ item.name }}</div>
                                    <div class="text-sm text-gray-500">₹ {{ item.price }}</div>
                                </div>
                            </div>
                            <p-inputnumber [inputStyle]="{ width: '2.5rem' }" [(ngModel)]="item.quantity" [showButtons]="true" buttonLayout="horizontal" (onInput)="updateCart(item)" [min]="0" [step]="1">
                                <ng-template #incrementbuttonicon>
                                    <span class="pi pi-plus"></span>
                                </ng-template>
                                <ng-template #decrementbuttonicon>
                                    <span class="pi pi-minus"></span>
                                </ng-template>
                            </p-inputnumber>
                        </div>
                    </ng-container>

                    <ng-template #emptyCart>
                        <div class="text-center text-gray-500 mt-6">Cart is empty</div>
                    </ng-template>
                </div>

                <!-- Prescription Upload -->
                <div class="mt-4">
                    <h3 class="font-semibold mb-2">Upload Prescription</h3>
                    <p-fileUpload mode="basic" name="prescription" accept=".pdf" maxFileSize="5000000" chooseLabel="Upload PDF" (onSelect)="onFileSelect($event)" [auto]="true"></p-fileUpload>
                </div>

                <!-- Suggested Medicines -->
                <div *ngIf="suggestedMedicines.length > 0" class="mt-4">
                    <h4 class="font-semibold mb-2">Suggested Medicines</h4>
                    <div class="grid grid-cols-1 gap-2">
                        <div *ngFor="let med of suggestedMedicines" class="flex justify-between items-center p-2 border rounded">
                            <span>{{ med.name }}</span>
                            <button pButton label="Add" size="small" (click)="addMedicineToCart(med)"></button>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <ng-template #footer>
                    <div class="flex justify-between items-center gap-4 mt-4">
                        <!-- Total Amount -->
                        <span class="font-semibold text-lg text-surface-900 dark:text-surface-0"> ₹ {{ totalAmount() }} </span>

                        <!-- Proceed Button -->
                        <button pButton label="Proceed" size="large" (click)="onProceed()" severity="info" [disabled]="cartItems().length === 0" [raised]="true"></button>
                    </div>
                </ng-template>
            </p-drawer>
        </div>
    `,
    styles: `
        ::ng-deep .p-drawer-header {
            border-bottom: 1px grey solid;
        }
        ::ng-deep .p-drawer-footer {
            border-top: 1px grey solid;
        }
    `
})
export class Cart implements OnInit {

  constructor(public router: Router) {}

    messageService = inject(MessageService);
    private medicareService = inject(MedicareService);

    visible: boolean = true;
    isActiveProceed: boolean = false;

    cartItems = signal<CartItem[]>([]);
    suggestedMedicines: Array<{ name: string }> = [];

    async ngOnInit() {
        try {
            // Fetch current cart from backend
            const data: any = await firstValueFrom(this.medicareService.getCart());
            this.cartItems.set(data.cart || []);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    }

    onDrawerClose() {
        this.visible = false;
        this.router.navigate(['/']);
    }

    onFileSelect(event: any) {
        const file: File = event.files[0];
        if (!file) return;

        this.messageService.add({ summary: `Prescription uploaded: ${file.name}`, severity: 'info', life: 3000 });
        this.suggestedMedicines = this.extractMedicinesFromPDF(file);
    }

    extractMedicinesFromPDF(file: File): Array<{ name: string }> {
        return [{ name: 'Paracetamol 500mg' }, { name: 'Amoxicillin 250mg' }, { name: 'Cetrizine 10mg' }];
    }

    addMedicineToCart(med: { name: string }) {
        // Mock: For demo purposes, you can add medicine with dummy ID & price
        const existing = this.cartItems().find((c) => c.name === med.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.cartItems.update((prev) => [...prev, { id: Date.now().toString(), name: med.name, image: '', price: 100, quantity: 1 }]);
        }
        this.messageService.add({ summary: `${med.name} added to cart`, severity: 'success', life: 2000 });
    }

    updateCart(item: CartItem) {
        if (item.quantity <= 0) {
            this.cartItems.update((prev) => prev.filter((p) => p.id !== item.id));
        }
        this.medicareService.addToCart(Number(item.id), item.quantity).subscribe({
            next: (res) => console.log('Cart updated:', res),
            error: (err) => console.error('Failed to update cart', err)
        });
    }

    totalAmount() {
        return this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    async onProceed() {
  if (this.cartItems().length === 0) return;

  try {
    // Prepare order payload

    // Call API
    const result = await firstValueFrom(this.medicareService.placeOrder(''));
    console.log('Order placed:', result);

    this.messageService.add({ summary: 'Order successfully placed!', severity: 'success', life: 3000 });

    // Optionally clear the cart after successful order
    this.cartItems.set([]);

  } catch (error) {
    console.error('Order placement failed', error);
    this.messageService.add({ summary: 'Failed to place order', severity: 'error', life: 3000 });
  }
}
}
