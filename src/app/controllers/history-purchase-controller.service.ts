import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {OrderHistoryService} from '../services/order-history.service';
import {OrderItemHistory} from '../models/order-product.model';
import {take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryPurchaseController {
  private _purchasesSignal = signal<OrderItemHistory[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  constructor(private orderHistoryService: OrderHistoryService) {}

  // Expuestos al componente
  private readonly _purchaseList: Signal<OrderItemHistory[]> = computed(() => this._purchasesSignal());
  private readonly _loadingPurchases = computed(() => this._loading());
  private readonly _errorMessage = computed(() => this._error());

  loadPurchases() {
    this._loading.set(true);
    this._error.set(null);

    this.orderHistoryService.getPurchases().pipe(take(1)).subscribe({
      next: (history: OrderItemHistory[]) => {
        this._purchasesSignal.set(history);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error al obtener el historial de compras');
        this._loading.set(false);
      }
    });
  }

  get purchaseList(): Signal<OrderItemHistory[]> {
    return this._purchaseList;
  }

  get loadingPurchases(): Signal<boolean> {
    return this._loadingPurchases;
  }

  get errorMessage(): Signal<string | null> {
    return this._errorMessage;
  }
}
