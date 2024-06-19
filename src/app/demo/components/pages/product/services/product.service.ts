import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productsRef: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = this.db.list<Product>(this.dbPath);
  }

  getProducts(): Observable<Product[]> {
    return this.productsRef.valueChanges();
  }

  getProductByKey(key: string): Observable<Product> {
    return this.db.object<Product>(`${this.dbPath}/${key}`).valueChanges();
  }

  createProduct(product: Product): void {
    this.productsRef.push(product);
  }

  updateProduct(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  deleteProduct(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }
}
