import { Component, OnInit, inject } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { firstValueFrom } from 'rxjs';
import { MedicareService } from '@/pages/service/medicare.service';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `
        <div class="card mb-8">
            <div class="font-semibold text-xl mb-4">Recent Sales</div>
            <p-table [value]="products" [paginator]="true" [rows]="5" responsiveLayout="scroll">
                <ng-template #header>
                    <tr>
                        <th>Image</th>
                        <th pSortableColumn="name">Medicines <p-sortIcon field="name"></p-sortIcon></th>
                        <th pSortableColumn="price">Price <p-sortIcon field="price"></p-sortIcon></th>
                        <th>Quantity</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td style="width: 15%; min-width: 5rem;">
                            <img [src]="product.image || 'https://via.placeholder.com/50'" class="shadow-lg" alt="{{ product.name }}" width="50" />
                        </td>
                        <td style="width: 35%; min-width: 7rem;">{{ product.name }}</td>
                        <td style="width: 35%; min-width: 8rem;">{{ product.price | currency: 'USD' }}</td>
                        <td style="width: 35%; min-width: 7rem;">{{ product.quantity }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    providers: [ProductService, MedicareService]
})
export class RecentSalesWidget implements OnInit {
    products: any = [];
    private productService = inject(MedicareService);

    async ngOnInit() {
    try {
      // Call API and get products
      const data: any = await firstValueFrom(this.productService.getProducts());
      this.products = data.products || [];
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  }
}
