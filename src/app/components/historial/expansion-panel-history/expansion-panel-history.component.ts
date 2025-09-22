import {Component, input, InputSignal} from '@angular/core';
import {OrderHistory} from '../../../models/order-product.model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {HistoryTableComponent} from '../history-table/history-table.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-expansion-panel-history',
  imports: [
    NgIf,
    HistoryTableComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    DatePipe,
    MatProgressBar,
    NgForOf
  ],
  templateUrl: './expansion-panel-history.component.html',
  standalone: true,
  styleUrl: './expansion-panel-history.component.css'
})
export class ExpansionPanelHistoryComponent {
  loadingPurchases: InputSignal<boolean> = input<boolean>(false);
  errorMessage: InputSignal<string | null> = input<string | null>(null);
  orderHistoryList: InputSignal<OrderHistory[]> = input<OrderHistory[]>([]);
  thereIsNotOrdersText: InputSignal<string> = input<string>("");
}
