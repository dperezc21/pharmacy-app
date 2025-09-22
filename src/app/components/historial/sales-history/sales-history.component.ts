import {Component, computed, OnInit, Signal} from '@angular/core';
import {HistorySaleController} from '../../../controllers/history-sale-controller.service';
import {MapOrderHistoryService} from '../../../services/map-order-history.service';
import {OrderHistory} from '../../../models/order-product.model';
import {ExpansionPanelHistoryComponent} from '../expansion-panel-history/expansion-panel-history.component';

@Component({
  selector: 'app-sales-history',
  imports: [
    ExpansionPanelHistoryComponent
  ],
  templateUrl: './sales-history.component.html',
  standalone: true,
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit {

  protected orderHistoryList!: Signal<OrderHistory[]>;

  constructor(protected historySaleController: HistorySaleController) {}
  ngOnInit(): void {
    this.historySaleController.loadSales();
    this.orderHistoryList = computed(() => MapOrderHistoryService.mapOrderHistory(this.historySaleController.saleList()));
  }

}
