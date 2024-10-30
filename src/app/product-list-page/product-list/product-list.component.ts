import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '../product.service';
import { LoadingComponent } from '../../loading/loading.component';
const PRODUCT_COUNT_PER_PAGE = 24;

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, AfterViewInit {
  private productService = inject(ProductService);
  private observer!: IntersectionObserver;

  anchor = viewChild.required<ElementRef<HTMLDivElement>>('anchor');

  hasMoreProduct = signal(true);
  page = signal(1);

  get products() {
    return this.productService.products;
  }

  get isError() {
    return this.productService.isError;
  }
  get isFetching() {
    return this.productService.isFetching;
  }

  fetchProduct() {
    this.productService.loadProducts(this.page()).subscribe({
      next: (data) => {
        if (data.length < PRODUCT_COUNT_PER_PAGE) {
          this.hasMoreProduct.set(false);
          this.observer.disconnect();
        } else {
          this.page.update((prev) => prev + 1);
        }
      },
    });
  }

  ngOnInit(): void {
    this.fetchProduct();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (this.isFetching()) {
          return;
        }
        this.fetchProduct();
      }
    });
    this.observer.observe(this.anchor().nativeElement);
  }
}
