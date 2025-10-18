import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  quantity = 1;
  loading = true;
  error = '';
  selectedImageIndex = 0;

  // Mock product images for gallery - replace with actual product images
  productImages: string[] = [];

  private routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.loadProduct(id);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  async loadProduct(id: number) {
    this.loading = true;
    this.error = '';

    try {
      this.product = await this.productService.getProductById(id);

      if (this.product) {
        const cartItem = this.cartService.getCart().find(p => p.id === this.product!.id);
        if (cartItem) {
          this.quantity = cartItem.quantity;
        }

        // Initialize product images for gallery
        this.productImages = [
          this.product.imageUrl || '/assets/placeholder.svg',
          '/assets/placeholder-2.svg', // Add actual image URLs
          '/assets/placeholder-3.svg',
          '/assets/placeholder-4.svg',
        ];
      }

      this.cdr.detectChanges();
    } catch (err) {
      console.error('Error fetching product:', err);
      this.error = 'Failed to load product. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  get mainImage(): string {
    return (
      this.productImages[this.selectedImageIndex] ||
      this.product?.imageUrl ||
      '/assets/placeholder.svg'
    );
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.qty) {
      this.quantity++;
      this.updateCartQuantity();
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateCartQuantity();
    }
  }

  onQuantityChange(value: number): void {
    if (isNaN(value) || value < 1) {
      this.quantity = 1;
      this.updateCartQuantity();
      return;
    }

    if (this.product && value > this.product.qty) {
      this.quantity = this.product.qty;
      this.updateCartQuantity();
      return;
    }

    this.quantity = value;
    this.updateCartQuantity();
  }

  updateCartQuantity(): void {
    if (this.product && this.cartService.isInCart(this.product.id)) {
      this.cartService.updateQuantity(this.product.id, this.quantity);
    }
  }

  addToCart(): void {
    if (!this.product || this.product.qty === 0) return;

    this.cartService.addToCart({
      ...this.product,
      quantity: this.quantity,
    });

    // Optional: Show confirmation before navigating
    this.router.navigate(['/cart']);
  }

  buyNow(): void {
    if (!this.product || this.product.qty === 0) return;

    this.cartService.addToCart({
      ...this.product,
      quantity: this.quantity,
    });

    this.router.navigate(['/checkout']);
  }

  get stockStatus(): { class: string; text: string } {
    if (!this.product) {
      return { class: 'text-gray-500', text: 'Loading...' };
    }

    if (this.product.qty > 10) {
      return {
        class: 'text-emerald-700',
        text: `In Stock - ${this.product.qty} available`,
      };
    } else if (this.product.qty > 0) {
      return {
        class: 'text-amber-700',
        text: `Low Stock - Only ${this.product.qty} left!`,
      };
    } else {
      return {
        class: 'text-red-700',
        text: 'Out of Stock',
      };
    }
  }
}
