import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private productService: ProductService) {}
  cartCount: number = 0;
  ngOnInit(): void {
    this.productService.CartState.subscribe((p) => {
      this.cartCount = p.length;
    });
  }
}
