import {
  AfterViewInit,
  Component,
  computed,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {DatePipe, NgIf} from '@angular/common';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatProgressBar} from '@angular/material/progress-bar';
import {OrderItemHistory} from '../../../models/order-product.model';
import {start} from 'node:repl';

@Component({
  selector: 'app-history-table',
  imports: [
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCardTitle,
    MatTable,
    MatCard,
    MatPaginator,
    NgIf,
    MatProgressBar,
    DatePipe
  ],
  templateUrl: './history-table.component.html',
  standalone: true,
  styleUrl: './history-table.component.css'
})
export class HistoryTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  orderItems = input<OrderItemHistory[]>([]);
  title = input<string>("");
  loadingPurchases = input<boolean>(false);
  errorMessage = input<string | null>("");

  columnsName: string[] = ['productName', 'date' , 'quantity', 'unitPrice', 'total'];

  private pageIndex = signal(0);
  private pageSize = signal(5);

  readonly itemsPaginated = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.orderItems().slice(start, start + this.pageSize());
  });

  ngAfterViewInit(): void {
    this.paginator?.page?.subscribe(event => {
      this.pageIndex.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
    });
  }

  changePage($event: PageEvent) {
    this.pageIndex.set($event.pageIndex);
    this.pageSize.set($event.pageSize);
  }

}
