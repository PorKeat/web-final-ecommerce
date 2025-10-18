import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];

  addToCart(product: Product) {
    const item = this.cart.find((p) => p.id === product.id);
    if (item) item.quantity += product.quantity;
    else this.cart.push({ ...product });
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter((p) => p.id !== id);
  }

  updateQuantity(id: number, qty: number) {
    const item = this.cart.find((p) => p.id === id);
    if (item) item.quantity = qty;
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
  }
}
