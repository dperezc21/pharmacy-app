 export interface ApplicationValue {
  name: string;
  description: string;
 }

 export interface Laboratory extends ApplicationValue {
    laboratoryId?: number;
 }

 export interface Category extends ApplicationValue {
  categoryId?: string;
 }



