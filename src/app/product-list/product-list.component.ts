import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from './product.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  get isAllChecked() {
    return this.productService.isAllChecked;
  }

  get isFetching() {
    return this.productService.isFetching;
  }

  get isError() {
    return this.productService.isError;
  }

  get products() {
    return this.productService.products;
  }

  handleClickRetryButton() {
    this.productService.loadProducts();
  }

  handleClickAll() {
    this.isAllChecked
      ? this.productService.unCheckAllProduct()
      : this.productService.checkAllProduct();
  }

  ngOnInit(): void {
    this.productService.loadProducts();
  }
}
