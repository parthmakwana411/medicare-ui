import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { TabsModule } from 'primeng/tabs';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-bottom-dock',
    imports: [CommonModule, FormsModule, TooltipModule, TabsModule, RouterModule],
    template: `
        <div class="card" style="padding:0">
            <p-tabs value="/">
                <p-tablist>
                    @for (item of items; track item) {
                        <p-tab class="flex flex-col items-center justify-center !gap-1 text-inherit" [routerLink]="item['route']">
                            <i [class]="item.icon" class="text-lg"></i>
                            <span class="text-sm">{{ item.label }}</span>
                        </p-tab>
                    }
                </p-tablist>
            </p-tabs>
        </div>
    `,
    styles:`
    ::ng-deep .p-tablist-tab-list {
        justify-content : space-evenly
    }
    `
})
export class BottomDock {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                route: ''
            },
            {
                label: 'Categories',
                icon: 'pi pi-objects-column',
                route: '/category'
            },
            {
                label: 'Orders',
                icon: 'pi pi-book',
                route: ''
            },
            {
                label: 'Account',
                icon: 'pi pi-user',
                route: '/auth/login'
            }
        ];
    }
}
