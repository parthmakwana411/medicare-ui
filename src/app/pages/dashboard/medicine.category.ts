import { Component, inject, OnInit, signal } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MedicareService } from '../service/medicare.service';
import { CarouseImage } from './components/carouselmage';
import { firstValueFrom } from 'rxjs';

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity?: number; // cart quantity
}

@Component({
    standalone: true,
    selector: 'sub-product-category',
    imports: [DataView, ButtonModule, CommonModule, FormsModule, InputNumber, CarouseImage],
    providers: [MedicareService],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <carouse-image></carouse-image>
            </div>

            <div class="col-span-12 xl:col-span-12">
                <div class="card">
                    <p-dataview #dv [value]="products()">
                        <ng-template #list let-items>
                            <div class="grid grid-cols-12 gap-4 grid-nogutter">
                                <div class="col-span-12" *ngFor="let item of items; let first = first">
                                    <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }">
                                        <div class="md:w-40 relative">
                                            <img style="width: 50%;" class="block xl:block mx-auto rounded-border" [src]="item.image" [alt]="item.name" />
                                        </div>

                                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                                <div>
                                                    <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                                                </div>
                                            </div>

                                            <div class="flex flex-col md:items-end gap-8">
                                                <div class="flex justify-between md:flex-row-reverse gap-2">
                                                    <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{ '₹ ' + item.price }}</span>

                                                    <div>
                                                        <!-- Add button if not in cart -->
                                                        <p-button *ngIf="!item.quantity || item.quantity === 0" icon="pi pi-shopping-cart" class="flex-auto md:flex-initial whitespace-nowrap" label="Add" (click)="addToCart(item)" />

                                                        <!-- InputNumber if in cart -->
                                                        <p-inputnumber
                                                            *ngIf="item.quantity && item.quantity > 0"
                                                            [inputStyle]="{ width: '2.5rem' }"
                                                            [(ngModel)]="item.quantity"
                                                            [showButtons]="true"
                                                            buttonLayout="horizontal"
                                                            inputId="horizontal"
                                                            spinnerMode="horizontal"
                                                            [step]="1"
                                                            (onInput)="updateCart(item)"
                                                        >
                                                            <ng-template #incrementbuttonicon>
                                                                <span class="pi pi-plus"></span>
                                                            </ng-template>
                                                            <ng-template #decrementbuttonicon>
                                                                <span class="pi pi-minus"></span>
                                                            </ng-template>
                                                        </p-inputnumber>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ng-template>
                    </p-dataview>
                </div>
            </div>
        </div>
    `
})
export class MedicineCategory implements OnInit {
    products = signal<Product[]>([]);
    previousQuantities = new Map<string, number>();

    private productService = inject(MedicareService);

    async ngOnInit() {
        try {
            // Get all products
            const data: any = await firstValueFrom(this.productService.getProducts());
            let products: Product[] = data.products.map((p: any) => ({ ...p, quantity: 0 }));

            // Get cart and merge quantities
            const cartData: any = await firstValueFrom(this.productService.getCart());
            const cart = cartData.cart || [];
            products = products.map((p) => {
                const cartItem = cart.find((c: any) => c.id === p.id);
                if (cartItem) {
                    p.quantity = cartItem.quantity;
                }
                return p;
            });

            this.products.set(products);
        } catch (error) {
            console.error('Failed to fetch products/cart', error);
        }
    }

    addToCart(product: Product) {
        product.quantity = 1;
        this.products.set([...this.products()]); // update UI

        this.productService.addToCart(Number(product.id), product.quantity).subscribe({
            next: (res) => console.log('Added to cart:', res),
            error: (err) => console.error('Failed to add to cart', err)
        });
    }

    updateCart(product: Product) {
        const prevQty = this.previousQuantities.get(product.id) ?? 0;
        const newQty = product.quantity ?? 0;

        // If user decreased quantity
        if (newQty < prevQty) {
            this.productService.addToCart(Number(product.id), -1).subscribe({
                next: (res) => console.log('Decremented item:', res),
                error: (err) => console.error('Failed to decrement cart', err)
            });
        }

        // If user increased quantity
        else if (newQty > prevQty) {
            this.productService.addToCart(Number(product.id), +1).subscribe({
                next: (res) => console.log('Incremented item:', res),
                error: (err) => console.error('Failed to increment cart', err)
            });
        }

        // Update the stored value and UI
        this.previousQuantities.set(product.id, newQty);
        this.products.set([...this.products()]);
    }
}
