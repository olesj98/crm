import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';
import { ModalInstance, MaterializeService } from 'src/app/shared/services/materialize.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;

  modal: ModalInstance;
  selecterOrder: Order;

  constructor() { }

  ngAfterViewInit() {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => total += item.cost * item.quantity, 0);
  }

  openDetails(order: Order) {
    this.selecterOrder = order;
    this.modal.open();
  }

  closeDetails() {
    this.modal.close();
  }

}
