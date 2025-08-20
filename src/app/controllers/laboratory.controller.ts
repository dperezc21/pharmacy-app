import {Injectable, signal} from '@angular/core';
import {LaboratoryService} from '../services/laboratory.service';
import {Laboratory} from '../models/ApplicationValue';
import {Observable, Subject, take, takeUntil, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryController {
  private destroy$: Subject<void> = new Subject<void>();
  private laboratories = signal<Laboratory[]>([]);

  constructor(private laboratoryService: LaboratoryService) {}

  loadLaboratories(): void {
    this.laboratoryService.getAllLaboratories().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.laboratories.set(data),
      error: (err) => console.error('Error cargando laboratorios:', err)
    });
  }

  addLaboratory(lab: Laboratory): Observable<Laboratory> {
    return this.laboratoryService.createLaboratory(lab).pipe(take(1), tap(value => {
      if(value?.laboratoryId) this.setNewLaboratory(value);
    }));
  }

  laboratoriesGot() {
    return this.laboratories;
  }

  private setNewLaboratory(newLaboratory: Laboratory): void {
    this.laboratories.update(value => [...value, newLaboratory]);
  }

  destroySubscriptions() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
