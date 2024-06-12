import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    this.productRef = db.list(this.dbPath);
  }

  // Métodos para o Firebase Realtime Database
  getItems(): Observable<Product[]> {
    return this.productRef.valueChanges();
  }

  addItem(product: Product): void {
    this.productRef.push(product);
  }

  deleteItem(key: string): void {
    this.productRef.remove(key);
  }
  updateItem(key: string, value: any): void { // Adicionando o método updateItem
    this.productRef.update(key, value).catch(error => {
      console.log(error);
    })
  }

  // Métodos para requisições HTTP
  getProductsSmall(): Promise<Product[]> {
    return this.http.get<any>('assets/demo/data/products-small.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProducts(): Promise<Product[]> {
    return this.http.get<any>('assets/demo/data/products.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProductsMixed(): Promise<Product[]> {
    return this.http.get<any>('assets/demo/data/products-mixed.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }

  getProductsWithOrdersSmall(): Promise<Product[]> {
    return this.http.get<any>('assets/demo/data/products-orders-small.json')
      .toPromise()
      .then(res => res.data as Product[])
      .then(data => data);
  }
}
