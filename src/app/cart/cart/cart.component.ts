import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { IProduct } from 'src/app/iproducts';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService) {}
  cartProducts: IProduct[] = [];
  cartSubTotal = 0;
  cartTax = 0;
  cartTotal = 0;
  modelOpen = false;
  ngOnInit(): void {
    this.productService.CartState.subscribe((products) => {
      this.cartProducts = products;
    });
    this.productService.BillingState.subscribe((p) => {
      this.cartSubTotal = p.cartSubTotal;
      this.cartTax = p.cartTax;
      this.cartTotal = p.cartTotal;
    });
  }

  removeProduct(product: IProduct) {
    this.productService.removeFromCart(product);
  }

  increaseQty(product: IProduct) {
    this.productService.increaseQty(product);
  }

  decreaseQty(product: IProduct) {
    this.productService.decreaseQty(product);
  }

  clearCart() {
    this.productService.clearCart();
  }

  openConfirmModal() {
    this.modelOpen = true;
  }

  closeConfirmModal() {
    this.modelOpen = false;
  }
}
