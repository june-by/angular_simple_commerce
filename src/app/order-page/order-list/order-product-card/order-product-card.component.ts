import { Component, inject, input, signal } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { ProductType } from '../../../../model/product.model';

@Component({
  selector: 'app-order-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-product-card.component.html',
  styleUrl: './order-product-card.component.css',
})
export class OrderProductCardComponent {
  private orderService = inject(OrderService);
  isRemoveLoading = signal(false);

  product = input.required<ProductType>();

  handleClickPlusButton() {
    this.orderService.addProductQuantity(this.product().id);
  }

  handleClickMinusButton() {
    this.orderService.minusQuantity(this.product().id);
  }

  handleClickCheck() {
    this.product().isChecked
      ? this.orderService.unCheckProduct(this.product().id)
      : this.orderService.checkProduct(this.product().id);
  }

  handleClickDelete() {
    this.isRemoveLoading.set(true);
    this.orderService.removeProduct(this.product().id).subscribe({
      next: () => this.isRemoveLoading.set(false),
    });
  }
}
