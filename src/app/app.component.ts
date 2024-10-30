import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './order-page/product-list/product-list.component';
import { FixedBottomOrderComponent } from './order-page/fixed-bottom-order/fixed-bottom-order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_simple_commerce';
}
