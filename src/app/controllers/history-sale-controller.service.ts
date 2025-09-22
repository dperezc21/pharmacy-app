import {computed, Injectable, Signal, signal} from '@angular/core';
import {OrderHistoryService} from '../services/order-history.service';
import {takeUntil} from 'rxjs';
import {OrderItemHistory} from '../models/order-product.model';
import {DestroySubject} from '../services/destroy-subject.service';

@Injectable({
  providedIn: 'root'
})
export class HistorySaleController extends DestroySubject {
  private salesSignal = signal<OrderItemHistory[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  constructor(private orderHistoryService: OrderHistoryService) {
    super();}

  private readonly _saleList: Signal<OrderItemHistory[]> = computed(() => this.salesSignal());
  private readonly _loadingSales = computed(() => this.loading());
  private readonly _errorMessage = computed(() => this.error());

  loadSales() {
    this.loading.set(true);
    this.error.set(null);

    this.orderHistoryService.getSales().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data: OrderItemHistory[]) => {
        this.salesSignal.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al obtener el historial de ventas');
        this.loading.set(false);
      }
    });
  }


  get saleList(): Signal<OrderItemHistory[]> {
    return this._saleList;
  }

  get loadingSales(): Signal<boolean> {
    return this._loadingSales;
  }

  get errorMessage(): Signal<string | null> {
    return this._errorMessage;
  }
}
