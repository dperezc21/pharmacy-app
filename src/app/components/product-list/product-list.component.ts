import {Component, input, Input, OnInit, output} from '@angular/core';
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
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
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
    MatIcon,],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  addProduct = output();
  products = input<Product[]>([]);
  displayedColumns: string[] = ['name', 'price', 'description', 'category', 'code', 'buttons'];
  dataSource!: MatTableDataSource<Product>; /*new MatTableDataSource<Product>([
    {
      name: 'Paracetamol',
      price: 1.5,
      description: 'Analgésico y antipirético',
      /!*imagen: 'assets/paracetamol.jpg',*!/
      category: 'Analgésico',
      code: '1234567890'
    },
    {
      name: 'Ibuprofeno',
      price: 2.0,
      description: 'Antiinflamatorio no esteroideo',
      /!*imagen: 'assets/ibuprofeno.jpg',*!/
      category: 'Antiinflamatorio',
      code: '9876543210'
    }
  ]);*/

  eliminarProducto(index: number) {
    const productos = this.dataSource.data;
    productos.splice(index, 1);
    this.dataSource.data = [...productos];
  }


  agregarProducto() {
    this.addProduct.emit()
    /*const nuevo: Product = {
      name: 'Nuevo producto',
      price: 0,
      description: '',
      category: 'General',
      code: '',
      productWeight: 10
    };
    this.dataSource.data = [...this.dataSource.data, nuevo];*/
  }


  /*editarProducto(index: number, campo: keyof Producto, valor: any) {
    const productos: Producto[] = this.dataSource.data;
    productos[index][campo] = valor;
    this.dataSource.data = [...productos];
  }*/

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
