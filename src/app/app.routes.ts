import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductsComponent} from './components/products/products.component';
import {InventoryComponent} from './components/inventory/inventory.component';
import {SellProductsFormComponent} from './components/sell-products-form/sell-products-form.component';
import {getProductsResolver} from './resolvers/get-products.resolver';
import {GetCategoriesResolver} from './resolvers/get-categories.resolver';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductsComponent,
    resolve: {getAllProducts: getProductsResolver, getAllCategories: GetCategoriesResolver }
  },
  {
    path: "inventory",
    component: InventoryComponent
  },
  {
    path: "sale",
    component: SellProductsFormComponent
  }
];
