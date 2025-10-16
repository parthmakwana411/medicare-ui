import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { TabsModule } from 'primeng/tabs';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-bottom-dock',
    standalone: true,
    imports: [CommonModule, FormsModule, TooltipModule, TabsModule, RouterModule],
    template: `
        <div class="card" style="padding:0">
            <div class="flex justify-evenly">
                <ng-container *ngFor="let item of items">
                    <a
                        [routerLink]="item['route']"
                        routerLinkActive="active-tab"
                        class="flex flex-col items-center justify-center py-2 w-full text-gray-600 hover:text-primary transition-all"
                    >
                        <i [class]="item.icon" class="text-lg"></i>
                        <span class="text-sm">{{ item.label }}</span>
                    </a>
                </ng-container>
            </div>
        </div>
    `,
    styles: [`
        .active-tab {
            color: var(--p-primary-color);
            font-weight: 600;
        }
    `]
})
export class BottomDock implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Home', icon: 'pi pi-home', route: '/' },
            { label: 'Categories', icon: 'pi pi-objects-column', route: '/category' },
            { label: 'Orders', icon: 'pi pi-book', route: '/orders' },
            { label: 'Account', icon: 'pi pi-user', route: '/account' }
        ];
    }
}
