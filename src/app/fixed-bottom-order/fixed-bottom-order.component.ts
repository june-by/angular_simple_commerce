import { Component, inject } from '@angular/core';
import { ProductService } from '../product-list/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fixed-bottom-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixed-bottom-order.component.html',
  styleUrl: './fixed-bottom-order.component.css',
})
export class FixedBottomOrderComponent {
  private productService = inject(ProductService);

  get checkedProductsCount() {
    return this.productService.checkedProducts.length;
  }

  get totalPrice() {
    return this.productService.totalPrice;
  }
}
