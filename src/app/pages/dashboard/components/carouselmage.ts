import { Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'carouse-image',
    imports: [CommonModule, Carousel, ButtonModule],
    template: `
        <div class="card" style="padding: 0">
            <p-carousel [value]="products" [numVisible]="3" [numScroll]="1" [circular]="true" [responsiveOptions]="responsiveOptions" autoplayInterval="3000">
                <ng-template let-product #item>
                    <div class="border border-surface-200 dark:border-surface-700 rounded">
                        <div class="mb-4">
                            <div class="relative mx-auto">
                                <img [src]="product.image" [alt]="product.name" class="w-full rounded-border" />
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-carousel>
        </div>
    `,
    styles: `
        ::ng-deep .p-tablist-tab-list {
            justify-content: space-evenly ;
        }

        ::ng-deep .p-carousel-next-button {
            display : none ; 
        }

        ::ng-deep .p-carousel-prev-button {
            display : none ;
        }
    `
})
export class CarouseImage {
    products = [
        {
            image: 'https://assets.truemeds.in/Images/BannerImages/BannerImage_02_08_031_14_Sep_2025.png',
        },
        {
            image: 'https://assets.truemeds.in/Images/BannerImages/BannerImage_06_09_000_06_Oct_2025.png',
        }
    ];
    responsiveOptions: any[] | undefined;

    ngOnInit() {
        this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }
}
