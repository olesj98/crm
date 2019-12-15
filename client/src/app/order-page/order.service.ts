import { Injectable } from '@angular/core';
import { Position, OrderPosition } from '../shared/interfaces';
import { MaterializeService } from '../shared/services/materialize.service';

@Injectable()
export class OrderService {

    constructor(
    ) { }

    public list: OrderPosition[] = [];
    public price = 0;

    add(position: Position) {
        const orderPosition = {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        };

        const existingItemIndex = this.list.findIndex(item => item._id === orderPosition._id);

        if (existingItemIndex !== -1) {
            const existingItem = this.list[existingItemIndex];
            existingItem.quantity = existingItem.quantity + orderPosition.quantity;
            this.list[existingItemIndex] = existingItem;
        } else {
            this.list.push(orderPosition);
        }

        this.calcPrice();
        MaterializeService.toast(`"${orderPosition.name}" is added to order list.`);
    }

    remove(orderPosition: OrderPosition) {
        this.list = this.list.filter(item => item._id !== orderPosition._id);
        this.calcPrice();
        MaterializeService.toast(`"${orderPosition.name}" removed from order list.`);
    }

    clear() {
        this.list = [];
        this.price = 0;
    }

    calcPrice() {
        this.price = this.list.reduce((total, item) => total += item.cost * item.quantity, 0);
    }
}
