import { Component, OnInit } from '@angular/core';
import { Order } from './models/order.model';
import { OrderService } from './services/order.service';

@Component({
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  order: Order = {};
  selectedOrder: Order;
  displayDialog: boolean;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  showDialogToAdd(): void {
    this.order = {};
    this.displayDialog = true;
  }

  save(): void {
    if (this.order.key) {
      this.orderService.updateOrder(this.order.key, this.order).subscribe(() => {
        this.updateOrders();
        this.order = {};
        this.displayDialog = false;
      });
    } else {
      this.orderService.addOrder(this.order).subscribe(() => {
        this.updateOrders();
        this.order = {};
        this.displayDialog = false;
      });
    }
  }

  delete(): void {
    if (this.order.key) {
      this.orderService.deleteOrder(this.order.key).subscribe(() => {
        this.updateOrders();
        this.order = {};
        this.displayDialog = false;
      });
    }
  }

  updateOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  onRowSelect(event): void {
    this.order = { ...event.data };
    this.displayDialog = true;
  }
}
