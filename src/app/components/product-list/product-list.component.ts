import {AfterViewInit, Component, input, OnInit, output, ViewChild} from '@angular/core';
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
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Product} from '../../models/product.model';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {tap} from 'rxjs';

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
    MatIcon, MatMenuItem, MatPaginator, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  addProduct = output();
  editProduct = output<Product>();
  deleteProduct = output<Product>();
  products = input<Product[]>([]);
  displayedColumns: string[] = ['code','name', 'price', 'category', 'description', 'buttons'];
  dataSource!: MatTableDataSource<Product>;
  totalItems!: number;
  formProductList!: FormGroup;

  productByCode(code: string = "") {
    if(!code?.trim()) {
      this.dataSource = new MatTableDataSource<Product>(this.products());
      return;
    }
    const productFound: Product = this.dataSource.data.find(p => p.code === code) as Product;
    if(productFound?.id) this.dataSource = new MatTableDataSource<Product>([...[], productFound]);
  }

  ngOnInit(): void {
    this.formProductList = new FormGroup({
      code: new FormControl('')
    });
    this.dataSource = new MatTableDataSource<Product>(this.products());
    this.formProductList.get('code')?.valueChanges
      .pipe(tap(c => this.productByCode(c))).subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
