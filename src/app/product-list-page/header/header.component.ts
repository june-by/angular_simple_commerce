import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartButtonComponent } from './cart-button/cart-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CartButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
