import { Component } from '@angular/core';
import { ProductListComponent } from './order-list/order-list.component';
import { FixedBottomOrderComponent } from './fixed-bottom-order/fixed-bottom-order.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [ProductListComponent, FixedBottomOrderComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css',
})
export class OrderPageComponent {}
