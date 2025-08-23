import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProductController} from '../controllers/product.controller';
import {Product} from '../models/product.model';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class getProductsResolver implements Resolve<Product[]>{
  constructor(private productController: ProductController) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<RedirectCommand | Product[]> {
    const products: Product[] = this.productController.productsGot()();
    if(products?.length) return products;
    return this.productController.getAllProducts();
  }
}
