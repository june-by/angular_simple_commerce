import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css',
})
export class CartButtonComponent implements OnInit {
  private cartService = inject(CartService);

  get isFetching() {
    return this.cartService.isFetching;
  }

  get isError() {
    return this.cartService.isError;
  }

  get cartProductsCount() {
    return this.cartService.products.length;
  }

  ngOnInit(): void {
    this.cartService.loadCartProducts();
  }
}
