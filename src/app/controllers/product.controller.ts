import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {iif, map, Observable, take, takeUntil, tap} from 'rxjs';
import {DestroySubject} from '../services/destroy-subject.service';


@Injectable({ providedIn: "root" })
export class ProductController extends DestroySubject {

  private productList: WritableSignal<Product[]> = signal([]);

  constructor(private productService: ProductService) {
    super();}

  getAllProducts(): void {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$), tap({
        next: (products: Product[]) => this.productList.set(products)
      })).subscribe();
  }

  saveOrEditProduct(product: Product): Observable<boolean> {
    return iif(() => !!product?.id, this.editProduct(product), this.saveProduct(product));
  }

  saveProduct(product: Product): Observable<boolean> {
    return this.productService.saveProduct(product)
            .pipe(take(1), map((value: Product) => {
              if(value?.id) this.setNewProduct(value);
              return !!value?.id;
            }));
  }

  editProduct(product: Product): Observable<boolean> {
    return this.productService.editProduct(product)
      .pipe(take(1), map((value: Product) => {
        if(value?.id) this.updateProductEdited(value);
        return !!value?.id;
      }));
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
}
