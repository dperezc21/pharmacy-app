import {Component, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {DatePipe, NgIf} from '@angular/common';
import {PurchaseHistoryComponent} from '../purchase-history/purchase-history.component';
import {SalesHistoryComponent} from '../sales-history/sales-history.component';
import {HistorySaleController} from '../../../controllers/history-sale-controller.service';
import {HistoryPurchaseController} from '../../../controllers/history-purchase-controller.service';
import {type} from 'node:os';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatProgressBar} from '@angular/material/progress-bar';

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
export class HistoryContainerComponent {

  views: 'compra' | 'venta' = 'compra';

  displayView(type: 'compra' | 'venta') {
    this.views = type;
  }

}
