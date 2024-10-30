import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductType } from '../../model/product.model';
import { CartService } from './header/cart-button/cart.service';

const PRODUCT_API_URL = 'http://localhost:3000/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private cartService = inject(CartService);

  productListData = signal<ProductType[]>([]);
  isFetching = signal(true);
  isError = signal(false);

  get products() {
    return this.productListData().map((product) => {
      if (
        this.cartService.products.find(
          (cartProduct) => cartProduct.id === product.id
        )
      ) {
        return {
          ...product,
          isInCart: true,
        };
      } else {
        return {
          ...product,
          isInCart: false,
        };
      }
    });
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
