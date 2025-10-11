import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Dock } from 'primeng/dock';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-bottom-dock',
    imports: [Dock, CommonModule, FormsModule, TooltipModule],
    template: `
        <div class="card">
            <div class="dock-window">
                <p-dock [model]="items" [position]="'bottom'">
                    <ng-template #item let-item>
                        <div class="dock-item flex flex-col items-center justify-center text-center p-2 h-auto overflow-visible whitespace-nowrap">
                            <i [ngClass]="item.icon" class="text-2xl mb-1" [pTooltip]="item.label" tooltipPosition="top"></i>
                        </div>
                    </ng-template>
                </p-dock>
            </div>
        </div>
    `,
})
export class BottomDock {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home'
            },
            {
                label: 'Categories',
                icon: 'pi pi-objects-column'
            },
            {
                label: 'Orders',
                icon: 'pi pi-book'
            },
            {
                label: 'Account',
                icon: 'pi pi-user'
            }
        ];
    }
}
