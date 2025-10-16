import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrders(): Promise<any[]> {
    return Promise.resolve([
      {
        id: 'ORD-1001',
        image: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
        name: 'Amoxicillin 500mg',
        price: 150,
        quantity: 2,
        date: '2025-10-10',
        status: 'Shipped'
      },
      {
        id: 'ORD-1002',
        image: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
        name: 'Paracetamol 650mg',
        price: 90,
        quantity: 1,
        date: '2025-10-12',
        status: 'Processing'
      },
      {
        id: 'ORD-1003',
        image: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
        name: 'Cetrizine 10mg',
        price: 60,
        quantity: 1,
        date: '2025-10-14',
        status: 'Delivered'
      }
    ]);
  }
}
