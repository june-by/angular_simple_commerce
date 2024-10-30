import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '../product.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  get products() {
    return this.productService.products;
  }

  get isError() {
    return this.productService.isError;
  }
  get isFetching() {
    return this.productService.isFetching;
  }

  ngOnInit(): void {
    this.productService.loadProducts();
  }
}
