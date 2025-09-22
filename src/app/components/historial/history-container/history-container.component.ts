import {Component, OnDestroy} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {PurchaseHistoryComponent} from '../purchase-history/purchase-history.component';
import {SalesHistoryComponent} from '../sales-history/sales-history.component';
import {HistorySaleController} from '../../../controllers/history-sale-controller.service';
import {HistoryPurchaseController} from '../../../controllers/history-purchase-controller.service';

@Component({
  selector: 'app-history',
  imports: [
    MatButton,
    NgIf,
    PurchaseHistoryComponent,
    SalesHistoryComponent

  ],
  templateUrl: './history-container.component.html',
  standalone: true,
  styleUrl: './history-container.component.css'
})
export class HistoryContainerComponent implements OnDestroy {

  views: 'compra' | 'venta' = 'compra';

  constructor(private purchaseController: HistoryPurchaseController,
              private saleHistoryController: HistorySaleController) {}

  displayView(type: 'compra' | 'venta') {
    this.views = type;
  }

  ngOnDestroy(): void {
    this.purchaseController.destroySubscriptions();
    this.saleHistoryController.destroySubscriptions();
  }

}
