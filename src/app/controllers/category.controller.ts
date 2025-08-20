import {Injectable, signal} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/ApplicationValue';
import {Observable, Subject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryController {
  private destroy$: Subject<void> = new Subject<void>();
  private categories = signal<Category[]>([]);

  constructor(private categoryService: CategoryService) {
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error cargando categorías:', err)
    });
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryService.create(category).pipe(tap(value => {
      if(value?.categoryId) this.setNewCategory(value);
    }));
  }

  categoriesGot() {
    return this.categories;
  }

  private setNewCategory(newCategory: Category): void {
    this.categories.update(value => [...value, newCategory]);
  }

  destroySubscriptions() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
