import {AfterViewInit, Component, computed, input, signal, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {OrderItemHistory} from '../../../models/order-product.model';
import {TranslatePriceTypeNamePipe} from '../../../pipes/translate-price-type-name.pipe';

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
    MatTable,
    MatPaginator,
    DatePipe,
    TranslatePriceTypeNamePipe
  ],
  templateUrl: './history-table.component.html',
  standalone: true,
  styleUrl: './history-table.component.css'
})
export class HistoryTableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  orderItems = input<OrderItemHistory[]>([]);

  columnsName: string[] = ['productName', 'quantity', 'unitPrice', 'priceTypeName', 'date', 'total'];

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
