import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from '@angular/router';
import {InventoryModel} from '../models/inventory.model';
import {InventoryController} from '../controllers/Inventory.controller';

@Injectable({ providedIn: 'root' })
export class GetInventoryResolver implements Resolve<InventoryModel[]>{
  constructor(private inventoryController: InventoryController) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<RedirectCommand | InventoryModel[]> {
    return this.inventoryController.getAllInventories();
  }

}
