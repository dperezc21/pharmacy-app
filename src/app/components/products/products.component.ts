import {Component, OnInit, signal} from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductListComponent} from '../product-list/product-list.component';
import {ProductController} from '../../controllers/product.controller';
import {AddProductComponent} from '../add-product/add-product.component';
import {tap} from 'rxjs';
import {LaboratoryController} from '../../controllers/laboratory.controller';
import {CategoryController} from '../../controllers/category.controller';

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
export class ProductsComponent implements OnInit {

  protected products = signal<Product[]>([]);
  showFormAddProduct = signal(false);
  productSaved = signal<boolean>(false);

  constructor(private productController: ProductController,
              private laboratoryController: LaboratoryController,
              private categoryController: CategoryController) {}

  ngOnInit(): void {
    this.products = this.productController.productsGot();
    this.productController.getAllProducts();
    this.categoryController.loadCategories();
    this.laboratoryController.loadLaboratories();
  }

  displayFormAddProduct() {
      this.showFormAddProduct.update(value => !value);
  }

  saveProduct(product: Product) {
    this.productController.saveProduct(product)
      .pipe(tap(value => {
        if(value) {
          this.displayFormAddProduct();
          this.productSaved.set(value)
        }
      }))
      .subscribe();
  }
}
