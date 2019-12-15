import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MaterializeService, ModalInstance } from '../shared/services/materialize.service';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order, Filter } from '../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') ref: ElementRef;

  tooltip: ModalInstance;
  isFilterVisible = false;
  sub: Subscription;
  noMoreOrders = false;

  loading = false;
  reloading = false;

  orders: Order[] = [];

  offset = 0;
  limit = STEP;
  filter: Filter = {};

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.fetch();
    this.reloading = true;
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.tooltip = MaterializeService.initTooltip(this.ref);
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit,
      ...this.filter
    };
    this.sub = this.ordersService.fetch(params).subscribe(
      (orders) => {
        this.orders = this.orders.concat(orders);
        this.noMoreOrders = orders.length < STEP;
        this.loading = false;
        this.reloading = false;
      }
    );
  }

  loadMore() {
    this.loading = true;
    this.offset += STEP;
    this.fetch();
  }

  applyFilter(filter: Filter) {
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.filter = filter;
    this.fetch();
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }

}
