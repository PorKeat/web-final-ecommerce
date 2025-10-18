import { Component } from '@angular/core';
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
  standalone: true,
  imports: [CommonModule],
})
export class ProductCarouselComponent {}
