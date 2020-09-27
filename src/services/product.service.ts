import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { storeProducts, detailProduct } from '../assets/data/data.js';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/iproducts';

export interface IBill {
  cartSubTotal: number;
  cartTax: number;
  cartTotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private initialState: IProduct[] = [];
  private initialBill: IBill = {
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  private cart: IProduct[] = [];
  private URL: string = '../assets/data/data.json';
  constructor(private httpClient: HttpClient) {
    this.setProducts();
  }

  ProductState: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  CartState: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  BillingState: BehaviorSubject<IBill> = new BehaviorSubject(this.initialBill);

  getAllProducts() {
    return this.ProductState;
  }

  setProducts() {
    let tempProducts = [];
    storeProducts.forEach((element) => {
      const singleItem = { ...element };
      tempProducts = [...tempProducts, singleItem];
    });
    this.ProductState.next(tempProducts);
  }

  addToCart(product: IProduct) {
    let tempProducts: IProduct[] = this.ProductState.value;
    let tempProduct: IProduct = tempProducts[tempProducts.indexOf(product)];
    tempProduct.inCart = true;
    tempProduct.count = 1;
    tempProduct.total = tempProduct.price;
    // console.log(tempProducts);
    this.ProductState.next(tempProducts);
    let cart = [...this.CartState.value, product];
    this.CartState.next(cart);
    this.addTotals();
  }

  removeFromCart(product: IProduct) {
    let tempProducts: IProduct[] = this.ProductState.value;
    let tempCart: IProduct[] = this.CartState.value;

    //Removing from cart
    tempCart = tempCart.filter((p) => p.id != product.id);

    //Updating ProductState
    let tempProduct = tempProducts[tempProducts.indexOf(product)];
    tempProduct.inCart = false;
    tempProduct.count = 0;
    tempProduct.total = 0;

    this.ProductState.next(tempProducts);
    this.CartState.next(tempCart);
    this.addTotals();
  }

  increaseQty(product: IProduct) {
    let tempCart = this.CartState.value;
    let tempProduct = tempCart[tempCart.indexOf(product)];
    tempProduct.count += 1;
    tempProduct.total = tempProduct.count * tempProduct.price;
    this.CartState.next(tempCart);
    this.addTotals();
  }

  decreaseQty(product: IProduct) {
    let tempCart = this.CartState.value;
    let tempProduct = tempCart[tempCart.indexOf(product)];
    tempProduct.count -= 1;
    if (tempProduct.count === 0) {
      this.removeFromCart(product);
    } else {
      tempProduct.total = tempProduct.count * tempProduct.price;
      this.CartState.next(tempCart);
    }
    this.addTotals();
  }

  clearCart() {
    this.setProducts();
    this.CartState.next([]);
    this.addTotals();
  }

  addTotals() {
    let subTotal = 0;
    this.CartState.value.map((x) => (subTotal += x.total));
    const tax = parseFloat((subTotal * 0.1).toFixed(2));
    const total = subTotal + tax;
    const bill: IBill = {
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    };
    this.BillingState.next(bill);
  }
}
