import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}

@Injectable()
export class MedicineService {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Dr Morepen Gluco One Bg 03 Blood Glucose Test Strips 50',
                description: 'Product Description',
                image: "https://assets.truemeds.in/Images/ProductImage/TM-STPS1-000077/dr-morepen-gluco-one-bg-03-blood-glucose-test-strip-50_dr-morepen-gluco-one-bg-03-blood-glucose-test-strip-50--TM-STPS1-000077_1.png?width=240",
                price: 560,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            },
            // {
            //     id: '1001',
            //     code: 'nvklal433',
            //     name: 'Accu Chek Active Test Strips 50',
            //     description: 'Product Description',
            //     image: "https://assets.truemeds.in/Images/ProductImage/TM-STPS1-000075/accu-chek-active-strips-50_accu-chek-active-strips-50--TM-STPS1-000075_1.png?width=240",
            //     price: 960,
            //     category: 'Accessories',
            //     quantity: 61,
            //     inventoryStatus: 'INSTOCK',
            //     rating: 4
            // },
            // {
            //     id: '1002',
            //     code: 'zz21cz3c1',
            //     name: 'Dr Morepen Gluco One Bg 03 Blood Glucose Test Strips 25',
            //     description: 'Product Description',
            //     image: "https://assets.truemeds.in/Images/ProductImage/TM-STPS1-000096/dr-morepen-gluco-one-bg-03-blood-glucose-test-strip-25_dr-morepen-gluco-one-bg-03-blood-glucose-test-strip-25--TM-STPS1-000096_1.png?width=240",
            //     price: 79,
            //     category: 'Fitness',
            //     quantity: 2,
            //     inventoryStatus: 'LOWSTOCK',
            //     rating: 3
            // },
            // {
            //     id: '1003',
            //     code: '244wgerg2',
            //     name: 'Onetouch Select Test Strips 50',
            //     description: 'Product Description',
            //     image: "https://assets.truemeds.in/Images/ProductImage/TM-STPS1-000072/one-touch-select-test-strips-50--TM-STPS1-000072_1.png?width=240",
            //     price: 29,
            //     category: 'Clothing',
            //     quantity: 25,
            //     inventoryStatus: 'INSTOCK',
            //     rating: 5
            // },
        ];
    }

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

}
