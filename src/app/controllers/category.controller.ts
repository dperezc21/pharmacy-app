import {Injectable, signal} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/ApplicationValue';
import {Observable, take, takeUntil, tap} from 'rxjs';
import {DestroySubject} from '../services/destroy-subject.service';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryController extends DestroySubject {
  private categories = signal<Category[]>([]);

  constructor(private categoryService: CategoryService, private snackBarService: SnackBarService) {
    super();
  }

  loadCategories(): Observable<Category[]> {
    return this.categoryService.getAll().pipe(takeUntil(this.destroy$),tap({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error cargando categorías:', err)
    }));
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryService.create(category).pipe(take(1), tap(value => {
      if(value?.categoryId) {
        this.setNewCategory(value);
        this.snackBarService.showMessage("Categoria Guardada Correctamente");
      }
    }));
  }

  categoriesGot() {
    return this.categories;
  }

  private setNewCategory(newCategory: Category): void {
    this.categories.update(value => [...value, newCategory]);
  }
}
