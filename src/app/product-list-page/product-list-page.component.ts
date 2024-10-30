import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [HeaderComponent, ProductListComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.css',
})
export class ProductListPageComponent {}
