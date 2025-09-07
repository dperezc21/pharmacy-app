import {Routes} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {ProductsComponent} from '../components/products/products.component';
import {getProductsResolver} from '../resolvers/get-products.resolver';
import {GetCategoriesResolver} from '../resolvers/get-categories.resolver';
import {GetLaboratoriesResolver} from '../resolvers/get-laboratories.resolver';
import {InventoryComponent} from '../components/inventory/inventory.component';
import {GetInventoryResolver} from '../resolvers/get-inventory-resolver.service';
import {SellProductsFormComponent} from '../components/sell-products-form/sell-products-form.component';
import {HistoryContainerComponent} from '../components/historial/history-container/history-container.component';
import {userAuthenticatedGuard} from '../guards/user-authenticated.guard';

export const HomeRoute: Routes = [
  {
    path: "page",
    component: HomeComponent,
    outlet: 'home_page',
    canActivate: [userAuthenticatedGuard]
  },
  {
    path: "products",
    component: ProductsComponent,
    resolve: {getAllProducts: getProductsResolver,
      getAllCategories: GetCategoriesResolver,
      getAllLaboratories: GetLaboratoriesResolver },
    outlet: 'home_page',
    canActivate: [userAuthenticatedGuard]
  },
  {
    path: "inventory",
    component: InventoryComponent,
    resolve: { getAllProducts: getProductsResolver, getInventory: GetInventoryResolver },
    outlet: 'home_page',
    canActivate: [userAuthenticatedGuard]
  },
  {
    path: "sale",
    component: SellProductsFormComponent,
    resolve: { getAllProducts: getProductsResolver, getInventory: GetInventoryResolver },
    outlet: 'home_page',
    canActivate: [userAuthenticatedGuard]
  },
  {
    path: "historial",
    component: HistoryContainerComponent,
    outlet: 'home_page',
    canActivate: [userAuthenticatedGuard]
  }
] as Routes;
