import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private cartService: CartService) {
    this.cart = this.cartService.getCart();
  }

  submitOrder() {
    console.log('Order submitted', this.customer, this.cart);
    this.orderPlaced = true;
    this.cartService.clearCart();
  }

  get total() {
    return this.cartService.getTotal();
  }
}
