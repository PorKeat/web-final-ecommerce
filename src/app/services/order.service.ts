import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}

  submitOrder(customer: { name: string; email: string; address: string }, items: Product[], total: number): Promise<Order> {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const order: Order = {
          id: this.generateOrderId(),
          date: new Date(),
          customer,
          items,
          total,
        };
        console.log('Order submitted:', order);
        resolve(order);
      }, 1000);
    });
  }

  private generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}
