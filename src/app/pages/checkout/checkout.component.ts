import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class CheckoutComponent {
  cart: Product[] = [];
  customer = { name: '', email: '', address: '' };
  orderPlaced = false;
  orderDetails?: Order;
  showModal = false;

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
      this.showModal = true;
      this.cartService.clearCart();
    } catch (error) {
      console.error('Failed to submit order', error);
    }
  }

  get total() {
    return this.cartService.getTotal();
  }

  printInvoice() {
    if (!this.orderDetails) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${this.orderDetails.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; border-bottom: 1px solid #ccc; text-align: left; }
            .total { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>Invoice #${this.orderDetails.id}</h2>
          <p>Name: ${this.orderDetails.customer?.name}</p>
          <p>Email: ${this.orderDetails.customer?.email}</p>
          <p>Address: ${this.orderDetails.customer?.address}</p>
          <table>
            <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
            ${this.orderDetails.items
              .map(
                (i) => `
              <tr>
                <td>${i.name}</td>
                <td>${i.quantity}</td>
                <td>$${(i.price * i.quantity).toFixed(2)}</td>
              </tr>`
              )
              .join('')}
            <tr class="total">
              <td colspan="2">Total</td>
              <td>$${this.orderDetails.total.toFixed(2)}</td>
            </tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  continueShopping() {
    this.router.navigate(['/']);
  }

  closeModal() {
    this.showModal = false;
  }
}
