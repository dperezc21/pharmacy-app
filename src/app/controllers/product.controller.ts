import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {iif, map, Observable, take, takeUntil, tap} from 'rxjs';
import {DestroySubject} from '../services/destroy-subject.service';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({ providedIn: "root" })
export class ProductController extends DestroySubject {

  private productList: WritableSignal<Product[]> = signal([]);

  constructor(private productService: ProductService, private snackBarService: SnackBarService) {
    super();}

  getAllProducts(): Observable<Product[]> {
    return this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$), tap({
        next: (products: Product[]) => this.productList.set(products)
      }));
  }

  saveOrEditProduct(product: Product): Observable<boolean> {
    return iif(() => !!product?.id, this.editProduct(product), this.saveProduct(product));
  }

  saveProduct(product: Product): Observable<boolean> {
    return this.productService.saveProduct(product)
            .pipe(take(1), map((value: Product) => {
              if(value?.id) {
                this.setNewProduct(value);
                this.snackBarService.showMessage("Producto Guardado Correctamente");
              }
              return !!value?.id;
            }));
  }

  editProduct(product: Product): Observable<boolean> {
    return this.productService.editProduct(product)
      .pipe(take(1), map((value: Product) => {
        if(value?.id) {
          this.updateProductEdited(value);
          this.snackBarService.showMessage("Producto Editado Correctamente");
        }
        return !!value?.id;
      }));
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.productService.deleteProduct(productId).pipe(tap(value => {
      if(value) {
        this.removeProductOfList(productId);
        this.snackBarService.showMessage("El Producto fue Eliminado");
      }
    }))
  }

  productsGot(): WritableSignal<Product[]> {
    return this.productList;
  }

  private setNewProduct(product: Product): void {
    this.productList.update(value => [...value, product]);
  }

  private updateProductEdited(product: Product ): void {
    const mapProducts: Product[] = this.productList().map(value => value.id === product.id ? product: value)
    this.productList.set(mapProducts);
  }

  private removeProductOfList(productId: number): void {
    const productsFiltered: Product[] = this.productList().filter(value => value.id !== productId);
    this.productList.set(productsFiltered);
  }
}
