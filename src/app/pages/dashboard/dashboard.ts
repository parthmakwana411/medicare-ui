import { Component } from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CarouseImage } from "./components/carouselmage";
import { DashboardProduct } from './components/productDashboard';

@Component({
    selector: 'app-dashboard',
    imports: [InputIcon, IconField, InputTextModule, FormsModule, CarouseImage, DashboardProduct],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl:col-span-12">
                <p-iconfield>
                    <p-inputicon class="pi pi-search" />
                    <input type="text" style="width: 100%;" pSize="large" pInputText placeholder="Search for medicine" />
                </p-iconfield>
            </div>

            <div class="col-span-12 xl:col-span-12">
               <carouse-image></carouse-image>
            </div>

            <div class="col-span-12 xl:col-span-12">
               <dashboard-product></dashboard-product>
            </div>

        </div>
    `
})
export class Dashboard {}
