import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {OrderHistoryService} from '../services/order-history.service';
import {take} from 'rxjs';
import {OrderItemHistory} from '../models/order-product.model';

@Injectable({
  providedIn: 'root'
})
export class HistorySaleController {
  private salesSignal = signal<OrderItemHistory[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  constructor(private orderHistoryService: OrderHistoryService) {}

  private readonly _saleList: Signal<OrderItemHistory[]> = computed(() => this.salesSignal());
  private readonly _loadingSales = computed(() => this.loading());
  private readonly _errorMessage = computed(() => this.error());

  loadSales() {
    this.loading.set(true);
    this.error.set(null);

    this.orderHistoryService.getSales().pipe(take(1)).subscribe({
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
