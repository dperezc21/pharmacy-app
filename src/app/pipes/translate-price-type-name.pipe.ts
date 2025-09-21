import { Pipe, PipeTransform } from '@angular/core';
import {TRANSLATE_PRICE_TYPE} from '../constants/product.constants';

@Pipe({
  standalone: true,
  name: 'translatePriceTypeName'
})
export class TranslatePriceTypeNamePipe implements PipeTransform {

  private readonly TRANSLATE_TYPE = TRANSLATE_PRICE_TYPE;

  transform(value: string): string {
    return value ? this.TRANSLATE_TYPE.get(value) as string : "";
  }

}
