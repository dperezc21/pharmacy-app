import {Component, OnInit} from '@angular/core';
import {HistorySaleController} from '../../../controllers/history-sale-controller.service';
import {HistoryTableComponent} from '../history-table/history-table.component';

@Component({
  selector: 'app-sales-history',
  imports: [
    HistoryTableComponent
  ],
  templateUrl: './sales-history.component.html',
  standalone: true,
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit {

  constructor(protected historySaleController: HistorySaleController) {}
  ngOnInit(): void {
    this.historySaleController.loadSales();
  }

}
