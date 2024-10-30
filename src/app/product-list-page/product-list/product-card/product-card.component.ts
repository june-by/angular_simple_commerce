import { Component, inject, input } from '@angular/core';
import { ProductType } from '../../../../model/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../header/cart-button/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private cartService = inject(CartService);
  product = input.required<ProductType & { isInCart: boolean }>();

  handleClickCartButton() {
    if (!this.product().isInCart) {
      this.cartService.addToCart(this.product());
    } else {
      this.cartService.removeFromCart(this.product().id);
    }
  }
}
