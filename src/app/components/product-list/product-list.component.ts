import {Component, input, OnInit, output} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Product} from '../../models/product.model';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  imports: [MatFormField,
    MatTable,
    MatButton,
    MatInput,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    FormsModule,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatLabel,
    MatMenu,
    MatMenuTrigger,
    MatIcon, MatMenuItem,],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  addProduct = output();
  editProduct = output<Product>();
  deleteProduct = output<Product>();
  products = input<Product[]>([]);
  displayedColumns: string[] = ['code','name', 'price', 'category', 'description', 'buttons'];
  dataSource!: MatTableDataSource<Product>;

  cargarProductoPorCodigo(codigo: string) {
    const producto = this.dataSource.data.find(p => p.code === codigo);
    if (producto) {
      alert(`Producto encontrado: ${producto.name}`);
    } else {
      alert('Producto no encontrado.');
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>(this.products());
  }

}
