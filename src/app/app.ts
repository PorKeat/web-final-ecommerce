import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = 'web-final';
  currentYear: number;

  constructor(public cartService: CartService) {
    this.currentYear = new Date().getFullYear();
  }

  // Use a getter to read count directly from service
  get cartCount() {
    return this.cartService.getCart().reduce((acc, item) => acc + (item.quantity || 1), 0);
  }
}
