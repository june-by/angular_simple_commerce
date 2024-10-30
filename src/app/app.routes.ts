import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Product-List-Page',
    loadComponent: () =>
      import('./product-list-page/product-list-page.component').then(
        (mod) => mod.ProductListPageComponent
      ),
  },
  {
    path: 'order',
    title: 'Order-Page',
    loadComponent: () =>
      import('./order-page/order-page.component').then(
        (mod) => mod.OrderPageComponent
      ),
  },
];
