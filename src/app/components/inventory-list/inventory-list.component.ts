import {Component, input} from '@angular/core';
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
    MatHeaderCellDef
  ],
  templateUrl: './inventory-list.component.html',
  standalone: true,
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  products = input<InventoryProduct[]>([]);
  displayedColumns: string[] = ['code', 'name', 'stock', 'purchaseDate', 'stockLevel'];

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

}
