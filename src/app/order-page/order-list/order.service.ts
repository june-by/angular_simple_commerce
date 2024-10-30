import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ProductType } from '../../../model/product.model';

const CART_API_URL = 'http://localhost:3000/cart';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient = inject(HttpClient);
  orderProductListData = signal<ProductType[]>([]);
  isFetching = signal(true);
  isError = signal(false);

  get products() {
    return this.orderProductListData();
  }

  get isAllChecked() {
    return this.orderProductListData().length === 0
      ? false
      : this.orderProductListData().every((product) => product.isChecked);
  }

  get checkedProducts() {
    return this.orderProductListData().filter((product) => product.isChecked);
  }

  get totalPrice() {
    return this.orderProductListData().reduce((acc, cur) => {
      return acc + (cur.isChecked ? cur.quantity * cur.price : 0);
    }, 0);
  }

  loadProducts() {
    this.isFetching.set(true);
    this.isError.set(false);

    return this.httpClient
      .get<Omit<ProductType, 'isSelected' | 'quantity'>[]>(CART_API_URL)
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
        next: (data) => this.orderProductListData.set(data),
        complete: () => {
          setTimeout(() => {
            this.isFetching.set(false);
          }, 1000);
        },
        error: () => {
          setTimeout(() => {
            this.isError.set(true);
          }, 2000);
        },
      });
  }

  removeProduct(id: ProductType['id']) {
    return this.httpClient.delete(`${CART_API_URL}/${id}`).pipe(
      tap(() => {
        this.orderProductListData.update((prevProducts) =>
          prevProducts.filter((prevProduct) => prevProduct.id !== id)
        );
      }),
      catchError((error: any): Observable<any> => {
        if (window.confirm('실패했습니다. 다시 시도하시겠습니까?')) {
          return this.removeProduct(id);
        }
        return throwError(() => new Error(error));
      })
    );
  }

  checkAllProduct() {
    this.orderProductListData.update((prevProducts) =>
      prevProducts.map((product) => {
        return {
          ...product,
          isChecked: true,
        };
      })
    );
  }

  unCheckAllProduct() {
    this.orderProductListData.update((prevProducts) =>
      prevProducts.map((product) => {
        return {
          ...product,
          isChecked: false,
        };
      })
    );
  }

  checkProduct(id: ProductType['id']) {
    this.orderProductListData.update((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            isChecked: true,
          };
        }
        return {
          ...product,
        };
      })
    );
  }

  unCheckProduct(id: ProductType['id']) {
    this.orderProductListData.update((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            isChecked: false,
          };
        }
        return {
          ...product,
        };
      })
    );
  }

  addProductQuantity(id: ProductType['id']) {
    this.orderProductListData.update((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return {
          ...product,
        };
      })
    );
  }

  minusQuantity(id: ProductType['id']) {
    if (
      this.orderProductListData().find((product) => product.id === id)
        ?.quantity === 1
    ) {
      return alert('1개 이하로 줄일 수 없습니다.');
    }

    this.orderProductListData.update((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return {
          ...product,
        };
      })
    );
  }
}
