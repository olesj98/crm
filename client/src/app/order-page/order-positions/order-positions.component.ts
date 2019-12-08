import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.positions$ = this.activatedRoute.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetch(params.id);
        }
      ),
      map(
        (positions: Position[]) => {
          return positions.map((position: Position) => {
            position.quantity = 1;
            return position;
          });
        }
      )
    );
  }

  addToOrder(position: Position) {
    this.orderService.add(position);
  }

}
