import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';

@Component({
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  product: Product = {};
  selectedProduct: Product;
  displayDialog: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  showDialogToAdd(): void {
    this.product = {};
    this.displayDialog = true;
  }

  save(): void {
    if (this.product.key) {
      this.productService.updateProduct(this.product.key, this.product).subscribe(() => {
        this.updateProducts();
        this.product = {};
        this.displayDialog = false;
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.updateProducts();
        this.product = {};
        this.displayDialog = false;
      });
    }
  }

  delete(): void {
    if (this.product.key) {
      this.productService.deleteProduct(this.product.key).subscribe(() => {
        this.updateProducts();
        this.product = {};
        this.displayDialog = false;
      });
    }
  }

  updateProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onRowSelect(event): void {
    this.product = { ...event.data };
    this.displayDialog = true;
  }
}
