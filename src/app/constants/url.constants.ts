import {environment} from '../../environments/environment';

const INVENTORY_API: string = `${environment.INVENTORY_APY_URL}/api`;

export const PRODUCT_URL: string = `${INVENTORY_API}/products`;
export const CATEGORY_URL: string = `${INVENTORY_API}/categories`;
export const LABORATORY_URL: string = `${INVENTORY_API}/laboratories`;
export const ORDER_URL: string = `${INVENTORY_API}/orders`;
export const INVENTORY_URL: string = `${INVENTORY_API}/inventory`;
