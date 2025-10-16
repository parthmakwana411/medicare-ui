import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CartProduct } from "./components/cartproduct";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'cart',
    providers: [MessageService] ,
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
            @if(!isActiveProceed){
                <div class="flex items-center gap-2">
                <span class="w-full font-semibold text-surface-900 dark:text-surface-0">{{'₹ 956'}}</span>
                <button pButton label="Proceed" class="w-full" size="large" (click)="onProceed()" severity="info" [raised]="true"></button>
            </div>
            }
            
        </ng-template>
    </p-drawer>
    </div>
    `,
    standalone: true,
    styles: `

    ::ng-deep .p-drawer-header {
      border-bottom : 1px grey solid 
    }

    ::ng-deep .p-drawer-footer {
       border-top : 1px grey solid  
    }
    `,
    imports: [DrawerModule, ButtonModule, CartProduct]
})
export class Cart {

    messageService = inject(MessageService);

    isActiveProceed = false ;

    constructor(public router: Router) {}

    onDrawerClose(){
        this.router.navigate(['/']);
    }

    onProceed(){
        this.messageService.add({ summary: 'Order Suceessfully!', severity: 'success', life: 3000 });
        this.isActiveProceed = true
    }

    visible: boolean = true;

}