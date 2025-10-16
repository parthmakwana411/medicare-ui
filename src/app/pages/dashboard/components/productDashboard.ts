import { Component, inject, signal } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dashboard-product',
    imports: [DataView, ButtonModule, CommonModule],
    template: `
        <div class="card" style="padding : 0">
            <div class="border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-900">
                <div class="mb-4 text-base font-medium text-surface-900 dark:text-surface-0">Shop by categories</div>
            </div>
            <p-dataview #dv [value]="products">
                <ng-template #list let-items>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12" *ngFor="let item of items; let first = first">
                            <div class="flex items-center gap-4 p-4 border-b border-surface-200 dark:border-surface-700">
                                <img class="w-16 h-16 object-cover rounded-md" [src]="item.image" [alt]="item.name" />
                                <div class="flex-1">
                                    <div class="text-base font-medium text-surface-900 dark:text-surface-0">{{ item.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataview>
        </div>
    `,
    styles: `
        ::ng-deep .p-tablist-tab-list {
            justify-content: space-evenly;
        }
    `
})
export class DashboardProduct {
    products = [
        {
            image: 'https://assets.truemeds.in/Images/HomepageImage/Picture_1698138124558_3.png?width=240',
            name: 'Diabetes Care'
        },
        // {
        //     image: 'https://assets.truemeds.in/Images/HomepageImage/Picture_1698138117087_2.png?width=240',
        //     name: 'Health Conditions'
        // },
        // {
        //     image: 'https://assets.truemeds.in/Images/HomepageImage/Picture_1698138141109_5.png?width=240',
        //     name: 'Vitamins & Supplements'
        // }
    ];
}
