import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AnaliticsService } from '../shared/services/analitics.service';
import { AnaliticsPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analitics-page',
  templateUrl: './analitics-page.component.html',
  styleUrls: ['./analitics-page.component.scss']
})
export class AnaliticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  average: number;
  pending = true;
  sub: Subscription;

  constructor(
    private service: AnaliticsService
  ) { }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Orders',
      color: 'rgb(54, 162, 235)'
    };

    this.sub = this.service.getAnalitics().subscribe((data: AnaliticsPage) => {
      this.average = data.average;

      gainConfig.labels = data.chart.map(item => item.label);
      gainConfig.data = data.chart.map(item => item.gain);

      orderConfig.labels = data.chart.map(item => item.label);
      orderConfig.data = data.chart.map(item => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');

      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';

      const gainChart = new Chart(gainCtx, createChartConfig(gainConfig));
      const orderChart = new Chart(orderCtx, createChartConfig(orderConfig));

      this.pending = false;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}


function createChartConfig({ labels, data, label, color }) {
  console.log(data);
  console.log(labels);

  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
