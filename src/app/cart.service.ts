import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from './iproducts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: IProduct[] = [];

  private itemRemovedEvent: BehaviorSubject<IProduct> = new BehaviorSubject<
    IProduct
  >(null);
  private itemAddedEvent: BehaviorSubject<IProduct> = new BehaviorSubject<
    IProduct
  >(null);
  constructor() {}

  public getAllItems() {
    return this.cartItems;
  }

  public addToCart(product: IProduct) {
    if (product) {
      this.cartItems.push(product);
      this.itemAddedEvent.next(product);
    }
  }

  public removeFromCart(product: IProduct) {
    if (product) {
      this.cartItems = this.cartItems.filter((p) => p.id != product.id);
      this.itemRemovedEvent.next(product);
    }
  }

  public itemAddSubscription() {
    return this.itemAddedEvent;
  }

  public itemRemoveSubscription() {
    return this.itemRemovedEvent;
  }
}
