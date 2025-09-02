import {Component, OnInit} from '@angular/core';
import {HistoryPurchaseController} from '../../../controllers/history-purchase-controller.service';
import {HistoryTableComponent} from '../history-table/history-table.component';

@Component({
  selector: 'app-purchase-history',
  imports: [
    HistoryTableComponent
  ],
  templateUrl: './purchase-history.component.html',
  standalone: true,
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent implements OnInit {

  constructor(protected historyPurchaseController: HistoryPurchaseController) {}
  ngOnInit(): void {
    this.historyPurchaseController.loadPurchases();
  }
}
