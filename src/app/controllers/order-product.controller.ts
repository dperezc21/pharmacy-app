import {Injectable, signal} from '@angular/core';
import {OrderProductService} from '../services/order-product.service';
import {OrderRequestData} from '../models/order-product.model';
import {Observable, take, tap} from 'rxjs';
import {SnackBarService} from '../services/snack-bar.service';


@Injectable({ providedIn: "root"})
export class OrderProductController {

  private orderDone = signal<boolean>(false);

  constructor(private orderService: OrderProductService,
              private snackBarService: SnackBarService) {}

  buysProducts(orderData: OrderRequestData): Observable<boolean> {
    return this.orderService.placeOrder(orderData)
      .pipe(take(1), tap({
        next: (value: boolean) => {
          this.orderDone.set(value);
          this.snackBarService.showMessage("Productos Añadidos a Inventario")
        },
        error: () => this.snackBarService.showMessage("Error inisperado, intentelo otra vez")
      }));
  }

  sellProducts(orderData: OrderRequestData): Observable<boolean> {
    return this.orderService.sellOrderProduct(orderData)
      .pipe(take(1), tap({
        next: (value: boolean) => {
          this.orderDone.set(value);
          this.snackBarService.showMessage("Productos Vendidos");
        },
        error: () => this.snackBarService.showMessage("Error inisperado, intentelo otra vez")
      }))
  }

  orderIsDone() {
    return this.orderDone;
  }

  changeOrderIsDone() {
    this.orderDone.update(value => !value);
  }
}
