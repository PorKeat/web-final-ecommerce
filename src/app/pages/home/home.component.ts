import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCard } from "../../components/product-card/product-card";
import { ProductCarouselComponent } from "../../components/silder/silder";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCard, ProductCarouselComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      this.products = await this.productService.getProducts();
      console.log('Products loaded:', this.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

  viewDetail(id: number) {
    this.router.navigate(['/product', id]);
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
  }
}
  