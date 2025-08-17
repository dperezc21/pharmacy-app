import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

export interface Producto {
  nombre: string;
  precio: number;
  descripcion: string;
  /*imagen: string;*/
  categoria: string;
  codigo: string;
}

@Component({
  selector: 'app-products',
  imports: [
    MatFormField,
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
    MatIcon
  ],
  templateUrl: './products.component.html',
  standalone: true,
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  displayedColumns: string[] = [/*'imagen',*/ 'nombre', 'precio', 'descripcion', 'categoria', 'codigo', 'acciones'];
  dataSource = new MatTableDataSource<Producto>([
    {
      nombre: 'Paracetamol',
      precio: 1.5,
      descripcion: 'Analgésico y antipirético',
      /*imagen: 'assets/paracetamol.jpg',*/
      categoria: 'Analgésico',
      codigo: '1234567890'
    },
    {
      nombre: 'Ibuprofeno',
      precio: 2.0,
      descripcion: 'Antiinflamatorio no esteroideo',
      /*imagen: 'assets/ibuprofeno.jpg',*/
      categoria: 'Antiinflamatorio',
      codigo: '9876543210'
    }
  ]);

  constructor() {}

  agregarProducto() {
    const nuevo: Producto = {
      nombre: 'Nuevo producto',
      precio: 0,
      descripcion: '',
      /*imagen: 'assets/default.jpg',*/
      categoria: 'General',
      codigo: ''
    };
    this.dataSource.data = [...this.dataSource.data, nuevo];
  }

  eliminarProducto(index: number) {
    const productos = this.dataSource.data;
    productos.splice(index, 1);
    this.dataSource.data = [...productos];
  }

  /*editarProducto(index: number, campo: keyof Producto, valor: any) {
    const productos: Producto[] = this.dataSource.data;
    productos[index][campo] = valor;
    this.dataSource.data = [...productos];
  }*/

  cargarProductoPorCodigo(codigo: string) {
    const producto = this.dataSource.data.find(p => p.codigo === codigo);
    if (producto) {
      alert(`Producto encontrado: ${producto.nombre}`);
    } else {
      alert('Producto no encontrado.');
    }
  }

}
