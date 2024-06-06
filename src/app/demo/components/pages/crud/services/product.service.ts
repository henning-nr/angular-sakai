
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPath);
  }

  getItems(): Observable<Product[]> {
    return this.productRef.valueChanges();
  }

  addItem(product: Product): void {
    this.productRef.push(product);
  }

  deleteItem(key: string): void {
    this.productRef.remove(key);
  }
}
