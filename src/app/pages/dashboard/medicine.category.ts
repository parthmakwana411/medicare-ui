import { Component, inject, OnInit, signal } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { MedicineService } from '../service/medicine.service';
import { CarouseImage } from "./components/carouselmage";

@Component({
    standalone: true,
    selector: 'sub-product-category',
    imports: [DataView, ButtonModule, CommonModule, FormsModule, InputNumber, CarouseImage],
    providers: [MedicineService],
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
                    <div
                        class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                        [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }"
                    >
                        <div class="md:w-40 relative">
                            <img
                                style="width: 50%;"
                                class="block xl:block mx-auto rounded-border"
                                [src]="item.image"
                                [alt]="item.name"
                            />
                        </div>
                        <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                            <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                <div>
                                    <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="flex flex-col md:items-end gap-8">
                                <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{
                                    '₹ ' + item.price
                                }}</span>
                                <div class="flex justify-between md:flex-row-reverse gap-2">
                                    <p-button icon="pi pi-heart" [outlined]="true" />

                                    <div>
                                        <p-button *ngIf="cartcount == 0"
                                            icon="pi pi-shopping-cart"
                                            class="flex-auto md:flex-initial whitespace-nowrap"
                                            label="Add"
                                            (click)="cartcount +=1"
                                        />

                                        <p-inputnumber *ngIf="cartcount > 0" [inputStyle]="{ width: '2.5rem'}" [(ngModel)]="cartcount" [showButtons]="true" buttonLayout="horizontal" inputId="horizontal" spinnerMode="horizontal" [step]="1">
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
    `,
})
export class MedicineCategory implements OnInit {

    cartcount: number = 0;

    products = signal<any>([]);

    productService = inject(MedicineService);

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            const d = data.slice(0, 5);
            this.products.set([...d])
        });
    }
}
