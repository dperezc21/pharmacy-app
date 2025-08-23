import {Injectable, signal} from '@angular/core';
import {LaboratoryService} from '../services/laboratory.service';
import {Laboratory} from '../models/ApplicationValue';
import {Observable, take, takeUntil, tap} from 'rxjs';
import {DestroySubject} from '../services/destroy-subject.service';
import {SnackBarService} from '../services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryController extends DestroySubject {
  private laboratories = signal<Laboratory[]>([]);

  constructor(private laboratoryService: LaboratoryService, private snackBarService: SnackBarService) {
    super();}

  loadLaboratories(): Observable<Laboratory[]> {
    return this.laboratoryService.getAllLaboratories().pipe(takeUntil(this.destroy$), tap({
      next: (data) => this.laboratories.set(data),
      error: (err) => console.error('Error cargando laboratorios:', err)
    }));
  }

  addLaboratory(lab: Laboratory): Observable<Laboratory> {
    return this.laboratoryService.createLaboratory(lab).pipe(take(1), tap(value => {
      if(value?.laboratoryId) {
        this.setNewLaboratory(value);
        this.snackBarService.showMessage("Laboratorio Guardado Correctamente");
      }
    }));
  }

  laboratoriesGot() {
    return this.laboratories;
  }

  private setNewLaboratory(newLaboratory: Laboratory): void {
    this.laboratories.update(value => [...value, newLaboratory]);
  }
}
