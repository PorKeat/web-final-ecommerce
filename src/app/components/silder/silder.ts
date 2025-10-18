import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-product-carousel',
  templateUrl: './silder.html',
  styleUrls: ['./silder.css'],
  standalone: true,       // ✅ enable standalone component
  imports: [CommonModule] // ✅ allows ngFor, ngClass, ngIf
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
  @Input() slides: CarouselSlide[] = [];

  currentSlide = 0;
  isAutoPlaying = true;
  private intervalId: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  handleInteraction() {
    this.isAutoPlaying = false;
    this.stopAutoplay();
  }

  startAutoplay() {
    if (!this.isAutoPlaying) return;
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
