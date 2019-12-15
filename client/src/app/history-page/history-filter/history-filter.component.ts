import { Component, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterializeService, MaterialDatepicker } from 'src/app/shared/services/materialize.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  @Output() filterEvent: EventEmitter<Filter> = new EventEmitter();

  order: number;

  startDatepicker: MaterialDatepicker;
  endDatepicker: MaterialDatepicker;

  isValid = true;

  constructor() { }

  ngAfterViewInit() {
    this.startDatepicker = MaterializeService.initDatepicker(this.startRef, this.validate.bind(this));
    this.endDatepicker = MaterializeService.initDatepicker(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy() {
    this.startDatepicker.destroy();
    this.endDatepicker.destroy();
  }

  validate() {
    if (!this.startDatepicker.date || !this.endDatepicker.date) {
      this.isValid = true;
      return;
    }

    this.isValid = this.startDatepicker.date <= this.endDatepicker.date;
  }

  submitFilter() {
    MaterializeService.updateTextInputs();
    const filter: Filter = {};
    if (this.order) {
      filter.order = this.order;
    }
    if (this.startDatepicker.date) {
      filter.start = this.startDatepicker.date;
    }
    if (this.endDatepicker.date) {
      filter.end = this.endDatepicker.date;
    }

    this.filterEvent.emit(filter);
  }

}
