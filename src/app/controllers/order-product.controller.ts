import {inject, Injectable, signal} from '@angular/core';
import {OrderProductService} from '../services/order-product.service';
import {OrderRequestData} from '../models/order-product.model';
import {Observable, take, tap} from 'rxjs';
import {SnackBarService} from '../services/snack-bar.service';
import {DialogMessageType} from '../constants/map-icons';
import {DialogMessageComponent} from '../components/dialog-message/dialog-message.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Injectable({ providedIn: "root"})
export class OrderProductController {

  private orderDone = signal<boolean>(false);
  private readonly dialog = inject(MatDialog);

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
          this.sellSuccessfullyMessage().beforeClosed().subscribe();
        },
        error: () => this.snackBarService.showMessage("Error inisperado, intentelo otra vez")
      }))
  }

  sellSuccessfullyMessage(): MatDialogRef<DialogMessageComponent> {
    const description: string = `Productos Vendidos exitosamente`;
    const infoData: DialogMessageType = { type: 'success', description };
    return this.dialog.open(DialogMessageComponent, {
      width: '420px',
      data: infoData,
      disableClose: true
    });
  }

  orderIsDone() {
    return this.orderDone;
  }

  changeOrderIsDone() {
    this.orderDone.update(value => !value);
  }
}
