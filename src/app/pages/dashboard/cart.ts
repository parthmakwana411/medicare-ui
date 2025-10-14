import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CartProduct } from "./components/cartproduct";

@Component({
    selector: 'cart',
    template: `
    <div class="card flex justify-center">
    <p-drawer [(visible)]="visible" position="full" (onHide)="onDrawerClose()">
        <ng-template #header>
        <div class="flex items-center gap-2">
            <span class="font-bold text-xl">Cart</span>
        </div>
    </ng-template>
    <div class="col-span-12 xl:col-span-12">
        <cart-product />
    </div>
    <ng-template #footer>
            <div class="flex items-center gap-2">
                <span class="w-full font-semibold text-surface-900 dark:text-surface-0">{{'₹ 956'}}</span>
                <button pButton label="Proceed" class="w-full" size="large" severity="info" [raised]="true"></button>
            </div>
        </ng-template>
    </p-drawer>
    </div>
    `,
    standalone: true,
    imports: [DrawerModule, ButtonModule, CartProduct]
})
export class Cart {

    constructor(public router: Router) {}

    onDrawerClose(){
        this.router.navigate(['/']);
    }

    visible: boolean = true;

}