import {ProductPriceType} from '../models/product.model';

export const PRODUCT_PRICE_TYPE: ProductPriceType[] = [
  {
    type: 'unit',
    label: 'Precio por unidad',
    selected: false,
    price: 0
  },
  {
    type: 'package',
    label: 'Precio por paquete',
    selected: false,
    price: 0
  },
  {
    type: 'box',
    label: 'Precio por Caja',
    selected: false,
    price: 0
  },
  {
    type: 'blister',
    label: 'Precio por Blister',
    selected: false,
    price: 0
  }
]
