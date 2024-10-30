import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProductType } from '../../model/product.model';
import { CartService } from './header/cart-button/cart.service';
import { catchError, finalize, tap, throwError } from 'rxjs';

const PRODUCT_API_URL = 'http://localhost:3000/products';
const PRODUCT_COUNT_PER_PAGE = 24;
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

  loadProducts(page: number) {
    this.isFetching.set(true);
    this.isError.set(false);

    return this.httpClient
      .get<ProductType[]>(
        `${PRODUCT_API_URL}?_start=${
          (page - 1) * PRODUCT_COUNT_PER_PAGE
        }&_end=${page * PRODUCT_COUNT_PER_PAGE}`
      )
      .pipe(
        tap((data) => {
          setTimeout(() => {
            this.productListData.update((prev) => [...prev, ...data]);
          }, 2000);
        }),
        catchError((error: any) => {
          setTimeout(() => {
            this.isError.set(true);
          }, 2000);
          return throwError(() => new Error(error));
        }),
        finalize(() => {
          setTimeout(() => {
            this.isFetching.set(false);
          }, 2000);
        })
      );
  }
}
