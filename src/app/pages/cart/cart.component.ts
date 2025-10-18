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

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
  }

  updateQty(item: Product, qty: number): void {
    // Ensure quantity is valid
    const validQty = Math.max(1, Math.floor(qty));
    if (item.quantity !== validQty) {
      item.quantity = validQty;
    }
    this.cartService.updateQuantity(item.id, validQty);
  }

  increaseQty(item: Product): void {
    const newQty = item.quantity + 1;
    item.quantity = newQty;
    this.cartService.updateQuantity(item.id, newQty);
  }

  decreaseQty(item: Product): void {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      item.quantity = newQty;
      this.cartService.updateQuantity(item.id, newQty);
    }
  }

  checkout(): void {
    if (this.cart.length === 0) {
      return;
    }
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']); // Adjust route as needed
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  get subtotal(): number {
    return this.total;
  }

  get tax(): number {
    return this.total * 0.08; // 8% tax rate
  }

  get grandTotal(): number {
    return this.total + this.tax;
  }
}