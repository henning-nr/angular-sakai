import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // ajustar conforme sua API

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(key: string): Observable<Order> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.get<Order>(url);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  updateOrder(key: string, order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.put<Order>(url, order);
  }

  deleteOrder(key: string): Observable<Order> {
    const url = `${this.apiUrl}/${key}`;
    return this.http.delete<Order>(url);
  }
}
