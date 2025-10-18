import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(id);
  }

  async loadProduct(id: number) {
    try {
      this.product = await this.productService.getProductById(id);
    } catch (err) {
      console.error('Error fetching product:', err);
    }
  }

  addToCart() {
    if (!this.product) return;
    this.cartService.addToCart({ ...this.product, quantity: this.quantity });
    this.router.navigate(['/cart']);
  }
}
