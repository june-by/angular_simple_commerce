import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductType } from '../../../../model/product.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

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

    return this.httpClient.get<ProductType[]>(CART_API_URL).subscribe({
      next: (data) => this.cartProductListData.set(data),
      complete: () => {
        this.isFetching.set(false);
      },
      error: () => {
        this.isError.set(true);
      },
    });
  }

  addToCart(product: ProductType) {
    this.httpClient.post(CART_API_URL, product).subscribe({
      next: () =>
        this.cartProductListData.update((prevProducts) => [
          ...prevProducts,
          product,
        ]),
      error: (error: any) => {
        if (
          window.confirm(
            '장바구니에 넣는데 실패했습니다. 다시 시도하시겠습니까?'
          )
        ) {
          return this.addToCart(product);
        }
        return throwError(() => new Error(error));
      },
    });
  }

  removeFromCart(id: ProductType['id']) {
    return this.httpClient.delete(`${CART_API_URL}/${id}`).subscribe({
      next: () => {
        this.cartProductListData.update((prevProducts) =>
          prevProducts.filter((prevProduct) => prevProduct.id !== id)
        );
      },
      error: (error: any) => {
        if (
          window.confirm(
            '장바구니에서 빼는데 실패했습니다. 다시 시도하시겠습니까?'
          )
        ) {
          return this.removeFromCart(id);
        }
        return throwError(() => new Error(error));
      },
    });
  }
}
