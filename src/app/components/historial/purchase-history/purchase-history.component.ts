import {Component, computed, OnInit, Signal} from '@angular/core';
import {HistoryPurchaseController} from '../../../controllers/history-purchase-controller.service';
import {MapOrderHistoryService} from '../../../services/map-order-history.service';
import {OrderHistory} from '../../../models/order-product.model';
import {ExpansionPanelHistoryComponent} from '../expansion-panel-history/expansion-panel-history.component';

@Component({
  selector: 'app-purchase-history',
  imports: [
    ExpansionPanelHistoryComponent
  ],
  templateUrl: './purchase-history.component.html',
  standalone: true,
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent implements OnInit {
  protected orderHistoryList!: Signal<OrderHistory[]>;
  constructor(protected historyPurchaseController: HistoryPurchaseController) {}
  ngOnInit(): void {
    this.historyPurchaseController.loadPurchases();
    this.orderHistoryList = computed(() => MapOrderHistoryService.mapOrderHistory(this.historyPurchaseController.purchaseList()));
  }
}
