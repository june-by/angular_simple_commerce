import { Component, inject, input, signal } from '@angular/core';
import { ProductType } from '../product.model';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private productService = inject(ProductService);
  isRemoveLoading = signal(false);

  product = input.required<ProductType>();

  handleClickPlusButton() {
    this.productService.addProductQuantity(this.product().id);
  }

  handleClickMinusButton() {
    this.productService.minusQuantity(this.product().id);
  }

  handleClickCheck() {
    this.product().isChecked
      ? this.productService.unCheckProduct(this.product().id)
      : this.productService.checkProduct(this.product().id);
  }

  handleClickDelete() {
    this.isRemoveLoading.set(true);
    this.productService.removeProduct(this.product().id).subscribe({
      next: () => this.isRemoveLoading.set(false),
    });
  }
}
