import { Product } from './product.model';

export interface Order {
  id: string;
  date: Date;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Product[];
  total: number;
}
