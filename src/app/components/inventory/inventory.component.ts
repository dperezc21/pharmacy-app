import {Component, OnInit} from '@angular/core';
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
import {DatePipe, NgClass} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {InventoryProduct} from '../../models/product.model';

@Component({
  selector: 'app-inventory',
  imports: [
    MatHeaderCell,
    MatCell,
    MatCellDef,
    DatePipe,
    MatColumnDef,
    MatHeaderCellDef,
    MatRow,
    MatHeaderRow,
    MatRowDef,
    MatTable,/*
    MatButton,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatSuffix,
    MatStartDate,
    MatEndDate,
    MatDateRangeInput,*/
    MatLabel,
    MatFormField,
    FormsModule,
    MatInput,
    MatHeaderRowDef,
    NgClass
  ],
  templateUrl: './inventory.component.html',
  standalone: true,
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  products: InventoryProduct[] = [];
  filteredProducts: InventoryProduct[] = [];
  filterCode: string = '';
  dateRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  displayedColumns: string[] = ['code', 'name', 'stock', 'purchaseDate', 'stockLevel'];

  ngOnInit(): void {
    // Simulación de productos (en producción, esto vendría de un servicio)
    this.products = [
      { code: 'MED001', name: 'Paracetamol', stock: 20, purchaseDate: new Date('2025-08-01') },
      { code: 'MED002', name: 'Ibuprofeno', stock: 15, purchaseDate: new Date('2025-08-10') },
      { code: 'MED003', name: 'Amoxicilina', stock: 5, purchaseDate: new Date('2025-07-15') },
      { code: 'ME003', name: 'Amoxicilina', stock: 5, purchaseDate: new Date('2025-07-15') },
    ];
    this.filteredProducts = this.products;
  }

  applyRangeDateFilter(): void {
    this.filteredProducts = this.products.filter(product => {
      const startDate = this.dateRange.start;
      const endDate = this.dateRange.end;
      const purchaseDate = new Date(product.purchaseDate);

      return startDate && endDate
        ? purchaseDate >= startDate && purchaseDate <= endDate
        : true;
    });
  }

  applyCodeFilter() {
    this.filteredProducts = this.products.filter(value => {
      return value.code.toLowerCase().includes(this.filterCode.toLowerCase());
    })
  }

  clearFilters(): void {
    this.filterCode = '';
    this.dateRange = { start: null, end: null };
    this.filteredProducts = this.products;
  }

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
