import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductType } from '../../../../model/product.model';
import { map } from 'rxjs';

const CART_API_URL = 'http://localhost:3000/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);
  cartProductListData = signal<ProductType[]>([]);

  get products() {
    return this.cartProductListData();
  }

  isFetching = signal(true);
  isError = signal(false);

  loadCartProducts() {
    this.isFetching.set(true);
    this.isError.set(false);

    return this.httpClient
      .get<ProductType[]>(CART_API_URL)
      .pipe(
        map((data) => {
          return data.map((product) => {
            return {
              ...product,
              isChecked: false,
              quantity: 1,
            };
          });
        })
      )
      .subscribe({
        next: (data) => this.cartProductListData.set(data),
        complete: () => {
          this.isFetching.set(false);
        },
        error: () => {
          this.isError.set(true);
        },
      });
  }
}
