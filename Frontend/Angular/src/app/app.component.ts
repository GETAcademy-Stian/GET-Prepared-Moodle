import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular';
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  cart: Product[] = [];

  addToCart(product: Product) {
    this.cart.push(product);
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter((p) => p.id !== product.id);
  }

  removeProduct(product: Product) {
    this.products = this.products.filter((p) => p.id !== product.id);
    this.removeFromCart(product);
  }
}
