import {AfterViewInit, Component, computed, input, signal, ViewChild} from '@angular/core';
import {DatePipe, NgClass} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {InventoryProduct} from '../../models/product.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-inventory-list',
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    NgClass,
    MatHeaderCellDef,
    MatPaginator,
    MatPaginator
  ],
  templateUrl: './inventory-list.component.html',
  standalone: true,
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products = input<InventoryProduct[]>([]);
  displayedColumns: string[] = ['code', 'name', 'stock', 'purchaseDate', 'stockLevel'];

  private pageIndex = signal(0);
  private pageSize = signal(5);

  protected itemsPaginated = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.products().slice(start, start + this.pageSize());
  });

  getStockLevelText(stock: number): string {
    if (stock === 0) return 'Sin stock';
    if (stock <= 5) return 'Bajo';
    if (stock <= 10) return 'Escaso';
    return 'Abundante';
  }

  getStockLevelClass(stock: number): string {
    if (stock === 0) return 'stock-none';
    if (stock <= 5) return 'stock-low';
    if (stock <= 10) return 'stock-medium';
    return 'stock-high';
  }

  changePage($event: PageEvent) {
    this.pageIndex.set($event.pageIndex);
    this.pageSize.set($event.pageSize);
  }

  ngAfterViewInit(): void {
    this.paginator?.page?.subscribe(event => {
      this.pageIndex.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
    });
  }

}
