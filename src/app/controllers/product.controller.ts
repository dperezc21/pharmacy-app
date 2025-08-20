import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {map, Observable, Subject, Subscription, take, takeUntil, tap} from 'rxjs';


@Injectable({ providedIn: "root" })
export class ProductController {

  private destroy$: Subject<void> = new Subject<void>();
  private productList: WritableSignal<Product[]> = signal([]);

  constructor(private productService: ProductService) {}

  getAllProducts(): void {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$), tap({
        next: (products: Product[]) => this.productList.set(products)
      })).subscribe();
  }

  saveProduct(product: Product): Observable<boolean> {
    return this.productService.saveProduct(product)
            .pipe(take(1), map(value => {
              return !!product?.id;
            }));
  }

  productsGot(): WritableSignal<Product[]> {
    return this.productList;
  }

  destroySubscriptions() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
