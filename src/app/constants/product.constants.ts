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
    type: 'box',
    label: 'Precio por caja',
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
    quantity: 0,
  },
];

export const TRANSLATE_PRICE_TYPE: Map<string, string> = new Map([
  ["unit", "Unidad"],
  ["box", "Caja"],
  ["package", "Paquete"]
]);
