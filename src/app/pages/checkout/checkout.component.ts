import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent {
  cart: Product[] = [];
  customer = { name: '', email: '', address: '' };
  orderPlaced = false;
  orderDetails?: Order;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.cart = this.cartService.getCart();
  }

  async submitOrder() {
    if (this.cart.length === 0) return;

    try {
      const order = await this.orderService.submitOrder(this.customer, this.cart, this.total);
      this.orderDetails = order;
      this.orderPlaced = true;
      this.cartService.clearCart();
    } catch (error) {
      console.error('Failed to submit order', error);
      // Optionally, show an error message to the user
    }
  }

  get total() {
    return this.cartService.getTotal();
  }

  printInvoice() {
    window.print();
  }

  continueShopping() {
    this.router.navigate(['/']);
  }
}
