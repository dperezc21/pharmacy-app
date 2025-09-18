import {ProductPriceType} from '../models/product.model';

export const PRODUCT_PRICE_TYPE: ProductPriceType[] = [
  {
    priceTypeId: undefined,
    type: 'unit',
    label: 'Precio por unidad',
    selected: false,
    price: 0,
    quantity: 0
  },
  {
    priceTypeId: undefined,
    type: 'package',
    label: 'Precio por paquete',
    selected: false,
    price: 0,
    quantity: 0
  },
  {
    priceTypeId: undefined,
    type: 'blister',
    label: 'Precio por Blister',
    selected: false,
    price: 0,
    quantity: 0
  }
]
