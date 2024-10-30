import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order-list/order.service';

@Component({
  selector: 'app-fixed-bottom-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixed-bottom-order.component.html',
  styleUrl: './fixed-bottom-order.component.css',
})
export class FixedBottomOrderComponent {
  private orderService = inject(OrderService);

  get checkedProductsCount() {
    return this.orderService.checkedProducts.length;
  }

  get totalPrice() {
    return this.orderService.totalPrice;
  }
}
