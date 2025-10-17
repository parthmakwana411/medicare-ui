import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MedicareService {
    private baseUrl = 'https://medicare-be-1.onrender.com';

    constructor(private http: HttpClient) {}

    /** ===================== AUTH ===================== **/

    sendOtp(phone_number: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/send-otp`, { phone_number });
    }

    verifyOtp(phone_number: string, otp: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/verify-otp`, { phone_number, otp });
    }

    /** ===================== PRODUCTS ===================== **/

    getProducts(): Observable<any> {
        return this.http.get(`${this.baseUrl}/products`);
    }

    /** ===================== CART ===================== **/

    addToCart(product_id: number, quantity: number): Observable<any> {
        return this.http.post(`${this.baseUrl}/cart/add`, { product_id, quantity });
    }

    getCart(): Observable<any> {
        return this.http.get(`${this.baseUrl}/cart`);
    }

    /** ===================== USER ===================== **/

    getUserDetails(): Observable<any> {
        return this.http.get(`${this.baseUrl}/user/details`);
    }

    saveUserDetails(name: string, email: string, address: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/user/details`, { name, email, address });
    }

    /** ===================== ORDER ===================== **/

    placeOrder(order: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/order/place`, order);
    }

    getOrders(): Observable<any> {
        return this.http.get(`${this.baseUrl}/orders`);
    }

    getOrdersForAdmin(): Observable<any> {
        return this.http.get(`${this.baseUrl}/admin/orders`);
    }

    updateOrderStatus(order_id: string, status: string): Observable<any> {
        return this.http.post(
            `${this.baseUrl}/order/update-status/${order_id}`,
            {}, // empty body
            { params: { status } } // status passed as query param
        );
    }

    sendDeliveryOtp(order_id: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/order/send-delivery-otp/${order_id}`, {});
    }

    verifyDelivery(order_id: string, otp: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/order/verify-delivery`, { order_id, otp });
    }
}
