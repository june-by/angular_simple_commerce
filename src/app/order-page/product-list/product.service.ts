import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductType } from './product.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  productData = signal<ProductType[]>([]);
  isFetching = signal(true);
  isError = signal(false);

  get products() {
    return this.productData().filter((product) => product.isRemoved === false);
  }

  get isAllChecked() {
    return this.productData().length === 0
      ? false
      : this.productData().every((product) => product.isChecked);
  }

  get checkedProducts() {
    return this.productData().filter((product) => product.isChecked);
  }

  get totalPrice() {
    return this.productData().reduce((acc, cur) => {
      return acc + (cur.isChecked ? cur.quantity * cur.price : 0);
    }, 0);
  }

  loadProducts() {
    this.isFetching.set(true);
    this.isError.set(false);

    return this.httpClient
      .get<Omit<ProductType, 'isSelected' | 'quantity'>[]>(
        'http://localhost:3000/products'
      )
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
        next: (data) => this.productData.set(data),
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
    return this.httpClient
      .patch(`http://localhost:3000/products/${id}`, {
        isRemoved: true,
      })
      .pipe(
        tap(() => {
          console.log('tap');
          this.productData.update((prevProducts) =>
            prevProducts.map((product) => {
              if (product.id === id) {
                return {
                  ...product,
                  isRemoved: true,
                };
              }
              return {
                ...product,
              };
            })
          );
        }),
        catchError((error: any): Observable<any> => {
          console.log('catchError');

          if (window.confirm('실패했습니다. 다시 시도하시겠습니까?')) {
            // 재귀적으로 addKey를 호출
            return this.removeProduct(id);
          }
          return throwError(() => new Error(error));
        })
      );
  }

  checkAllProduct() {
    this.productData.update((prevProducts) =>
      prevProducts.map((product) => {
        return {
          ...product,
          isChecked: true,
        };
      })
    );
  }

  unCheckAllProduct() {
    this.productData.update((prevProducts) =>
      prevProducts.map((product) => {
        return {
          ...product,
          isChecked: false,
        };
      })
    );
  }

  checkProduct(id: ProductType['id']) {
    this.productData.update((prevProducts) =>
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
    this.productData.update((prevProducts) =>
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
    this.productData.update((prevProducts) =>
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
      this.productData().find((product) => product.id === id)?.quantity === 1
    ) {
      return alert('1개 이하로 줄일 수 없습니다.');
    }

    this.productData.update((prevProducts) =>
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
