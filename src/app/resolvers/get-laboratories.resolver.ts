import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LaboratoryController} from '../controllers/laboratory.controller';
import {Laboratory} from '../models/ApplicationValue';

@Injectable({ providedIn: 'root' })
export class GetLaboratoriesResolver implements Resolve<Laboratory[]>{
  constructor(private laboratoryController: LaboratoryController) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<RedirectCommand | Laboratory[]> {
    const laboratories: Laboratory[] = this.laboratoryController.laboratoriesGot()();
    if(laboratories?.length) return laboratories;
    return this.laboratoryController.loadLaboratories();
  }

}
