import { Injectable } from '@angular/core';
import axios from 'axios';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://sengporkeat.setec-sv3.codes/api/product';

  private productCache = new Map<number, Product>();

  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(this.apiUrl);
      console.log('API response:', response.data); // <--- debug here
      return response.data;
    } catch (err) {
      console.error('Axios error:', err);
      return [];
    }
  }

  async getProductById(id: number): Promise<Product> {
    if (this.productCache.has(id)) {
      return this.productCache.get(id)!;
    }

    try {
      const response = await axios.get<Product>(`${this.apiUrl}/${id}`);
      console.log('Product detail response:', response.data); // debug
      this.productCache.set(id, response.data);
      return response.data;
    } catch (err) {
      console.error('Axios error:', err);
      throw err;
    }
  }
}
