import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
  }

  updateQty(item: Product, qty: number) {
    this.cartService.updateQuantity(item.id, qty);
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  get total() {
    return this.cartService.getTotal();
  }
}
