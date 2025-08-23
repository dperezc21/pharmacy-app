import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductController} from '../../controllers/product.controller';
import {AddProductComponent} from '../add-product/add-product.component';
import {EMPTY, switchMap, tap} from 'rxjs';
import {LaboratoryController} from '../../controllers/laboratory.controller';
import {CategoryController} from '../../controllers/category.controller';
import {ConfirmMessageComponent} from '../confirm-message/confirm-message.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmMessageData} from '../../models/confirm-message-data';

@Component({
  selector: 'app-products',
  imports: [
    ProductListComponent,
    AddProductComponent
  ],
  templateUrl: './products.component.html',
  standalone: true,
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  protected products = signal<Product[]>([]);
  showFormAddProduct = signal(false);
  productSaved = signal<boolean>(false);
  productToEdit = signal<Product | undefined>(undefined);
  private dialog = inject(MatDialog);

  constructor(private productController: ProductController,
              private laboratoryController: LaboratoryController,
              private categoryController: CategoryController) {}

  ngOnInit(): void {
    this.products = this.productController.productsGot();
    this.categoryController.loadCategories();
    this.laboratoryController.loadLaboratories();
  }

  displayFormAddProduct() {
      this.showFormAddProduct.update(value => !value);
  }

  saveProduct(product: Product) {
    this.productController.saveOrEditProduct(product)
      .pipe(tap(value => {
        if(value) {
          this.displayFormAddProduct();
          this.productSaved.set(value)
        }
      }))
      .subscribe();
  }

  displayFormToEditProduct(product: Product) {
    this.displayFormAddProduct();
    this.productToEdit.set(product);
  }

  ngOnDestroy(): void {
    this.productController.destroySubscriptions();
  }

  dialogDeleteProduct(product: Product) {
    const description = `¿Esta seguro que desea eliminar el producto ${product.name}`;
    const infoData: ConfirmMessageData = { type: 'info', title: "Delete Product", description };
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '400px',
      data: infoData,
    });
    dialogRef.afterClosed().pipe(switchMap(value => {
      return value ? this.productController.deleteProduct(product.id as number): EMPTY;
    })).subscribe(console.log);
  }
}
