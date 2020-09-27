import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { IProduct } from 'src/app/iproducts';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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

  removeAllProducts = false;
  productToRemove: IProduct = null;
  openConfirmModal(product?: IProduct) {
    if (!product) {
      this.removeAllProducts = true;
      this.modelOpen = true;
    } else {
      this.productToRemove = product;
      this.removeAllProducts = false;
      this.modelOpen = true;
    }
  }

  closeConfirmModal() {
    this.modelOpen = false;
  }

  onClickCheckout() {
    this.router.navigate(['shipping-details'], { relativeTo: this.route });
  }
}
