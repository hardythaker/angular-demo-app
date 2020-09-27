import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-shipping-detail',
  templateUrl: './shipping-detail.component.html',
  styleUrls: ['./shipping-detail.component.css'],
})
export class ShippingDetailComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.productService.clearCart();
  }
}
