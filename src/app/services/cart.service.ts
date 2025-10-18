import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartCount();
    }
  }

  addToCart(product: Product) {
    const item = this.cart.find((p) => p.id === product.id);
    if (item) item.quantity += product.quantity;
    else this.cart.push({ ...product });
    this.updateCartCount();
    this.saveCart();
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter((p) => p.id !== id);
    this.updateCartCount();
    this.saveCart();
  }

  updateQuantity(id: number, qty: number) {
    const item = this.cart.find((p) => p.id === id);
    if (item) item.quantity = qty;
    this.updateCartCount();
    this.saveCart();
  }

  getCart() {
    return this.cart;
  }

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cart = [];
    this.updateCartCount();
    this.saveCart();
  }

  private updateCartCount() {
    const count = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(count);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
