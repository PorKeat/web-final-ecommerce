import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCarouselComponent } from '../../components/silder/silder';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCarouselComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: Product[] = [];
  currentYear: number;

  constructor(
    private productService: ProductService,
    public cartService: CartService, // public to use in template
    private router: Router,
    private cdr: ChangeDetectorRef // ✅ inject ChangeDetectorRef
  ) {
    this.currentYear = new Date().getFullYear();
    this.loadProducts();
  }

  // TrackBy function for ngFor
  trackById(index: number, product: Product) {
    return product.id;
  }

  // Load products
  async loadProducts() {
    try {
      this.products = await this.productService.getProducts();
      this.cdr.detectChanges(); // ✅ ensure template updates
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

  // Navigate to product detail
  viewDetail(id: number) {
    this.router.navigate(['/product', id]);
  }

  // Add product to cart
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cdr.detectChanges(); // ✅ immediately refresh template
  }

  // ✅ getter to read cart count directly from service
  get cartCount() {
    return this.cartService.getCart().reduce((acc, item) => acc + (item.quantity || 1), 0);
  }
}
