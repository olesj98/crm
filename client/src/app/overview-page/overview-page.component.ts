import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AnaliticsService } from '../shared/services/analitics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces';
import { ModalInstance, MaterializeService } from '../shared/services/materialize.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('target') targetRef: ElementRef;

  data$: Observable<OverviewPage>;
  tapTarget: ModalInstance;

  yesterday = new Date();

  constructor(private service: AnaliticsService) { }

  ngOnInit() {
    this.data$ = this.service.getOverview();

    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }

  ngAfterViewInit() {
    this.tapTarget = MaterializeService.initTapTarget(this.targetRef);
  }

  openInfo() {
    this.tapTarget.open();
  }

}
