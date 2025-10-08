import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { MedicineSeriesService } from '../service/medicine.series.service';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(
        private readonly medicineSeriesService: MedicineSeriesService,
        readonly layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.medicineSeriesService.getMedicineSeries().subscribe((response) => {
            const model = [
                {
                    label: 'Menu',
                    command: () => this.layoutService.onMenuToggle()
                }
            ];

            this.model = [
                { items: [...model, ...response] }
            ];
        });
    }
}
