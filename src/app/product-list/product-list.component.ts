import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { CartService } from '../cart.service';
import { IProduct } from '../iproducts';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  constructor(private productService: ProductService) {
    //this.productService.getAllProducts();
    this.productService.getAllProducts().subscribe((p) => {
      this.allProducts = p;
      this.filteredProducts = p;
    });
  }

  ngOnInit(): void {}

  addToCart(product: IProduct) {
    // product.inCart = true;
    // product.count = 1;
    // product.total = product.price;
    this.productService.addToCart(product);
  }

  filterProducts(type: string) {
    if (type === 'allproducts') {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter((p) => p.type === type);
    }
  }
}
