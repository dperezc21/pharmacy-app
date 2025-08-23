import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from '@angular/router';
import {Category} from '../models/ApplicationValue';
import {CategoryController} from '../controllers/category.controller';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GetCategoriesResolver implements Resolve<Category[]>{
  constructor(private categoryController: CategoryController) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<RedirectCommand | Category[]> {
    const categories: Category[] = this.categoryController.categoriesGot()();
    if(categories.length > 0) return categories;
    return this.categoryController.loadCategories();
  }

}
