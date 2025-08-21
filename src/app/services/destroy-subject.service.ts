import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DestroySubject {
  protected destroy$: Subject<void> = new Subject<void>();

  destroySubscriptions() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
