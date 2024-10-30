import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderProductCardComponent } from './order-product-card/order-product-card.component';
import { OrderService } from './order.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [OrderProductCardComponent, LoadingComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class ProductListComponent implements OnInit {
  private orderService = inject(OrderService);

  get isAllChecked() {
    return this.orderService.isAllChecked;
  }

  get isFetching() {
    return this.orderService.isFetching;
  }

  get isError() {
    return this.orderService.isError;
  }

  get products() {
    return this.orderService.products;
  }

  handleClickRetryButton() {
    this.orderService.loadProducts();
  }

  handleClickAll() {
    this.isAllChecked
      ? this.orderService.unCheckAllProduct()
      : this.orderService.checkAllProduct();
  }

  ngOnInit(): void {
    this.orderService.loadProducts();
  }
}
