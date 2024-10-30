import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductType } from '../../model/product.model';

const PRODUCT_API_URL = 'http://localhost:3000/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  productListData = signal<ProductType[]>([]);
  isFetching = signal(true);
  isError = signal(false);

  get products() {
    return this.productListData();
  }

  loadProducts() {
    this.isFetching.set(true);
    this.isError.set(false);

    return this.httpClient.get<ProductType[]>(PRODUCT_API_URL).subscribe({
      next: (data) => this.productListData.set(data),
      complete: () => {
        setTimeout(() => {
          this.isFetching.set(false);
        }, 0);
      },
      error: () => {
        setTimeout(() => {
          this.isError.set(true);
        }, 2000);
      },
    });
  }
}
