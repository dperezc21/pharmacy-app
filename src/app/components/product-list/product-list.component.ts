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
import {MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {tap} from 'rxjs';
import {UserAuthenticatedController} from '../../controllers/user-authenticated.controller';
import {NgIf} from '@angular/common';

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
    MatIcon, MatMenuItem, MatPaginator, ReactiveFormsModule, MatIconButton, MatSuffix, NgIf],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  addProduct = output();
  editProduct = output<Product>();
  deleteProduct = output<Product>();
  products = input<Product[]>([]);
  displayedColumns: string[] = ['code','name', 'presentation', 'category', 'laboratory', 'buttons'];
  dataSource!: MatTableDataSource<Product>;
  totalItems!: number;
  formProductList!: FormGroup;

  constructor(protected userAuthenticatedController: UserAuthenticatedController) {}

  productByCode(code: string = "") {
    if(!code?.trim()) {
      this.dataSource = new MatTableDataSource<Product>(this.products());
      return;
    }
    const productFound: Product = this.dataSource.data.find(p => p.code === code) as Product;
    if(productFound?.id) this.dataSource = new MatTableDataSource<Product>([...[], productFound]);
  }

  cleanDataFilter(): void {
    this.codeForm?.setValue('');
    this.dataSource = new MatTableDataSource<Product>(this.products());
    this.setDataSourcePaginator();
  }

  get codeForm(): FormControl {
    return this.formProductList?.get('code') as FormControl;
  }

  setDataSourcePaginator(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.formProductList = new FormGroup({
      code: new FormControl('')
    });
    this.dataSource = new MatTableDataSource<Product>(this.products());
    this.codeForm?.valueChanges
      .pipe(tap(c => this.productByCode(c))).subscribe();
  }

  ngAfterViewInit(): void {
    this.setDataSourcePaginator();
  }

}
