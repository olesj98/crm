import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterializeService, ModalInstance } from '../shared/services/materialize.service';
import { OrderService } from './order.service';
import { OrderPosition, Order } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef;
  isRoot: boolean;
  modal: ModalInstance;
  pending = false;
  sub: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openModal() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pending = true;

    const order: Order = {
      list: this.orderService.list.map(item => {
        item._id = undefined;
        return item;
      })
    };

    this.sub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterializeService.toast(`Oreder number:${newOrder.order}, was added.`);
        this.orderService.clear();
      },
      error => MaterializeService.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      }
    );
  }

  removeItem(item: OrderPosition) {
    this.orderService.remove(item);
  }
}
