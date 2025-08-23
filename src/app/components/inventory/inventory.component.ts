import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {InventoryProduct} from '../../models/product.model';
import {InventoryListComponent} from '../inventory-list/inventory-list.component';
import {MatButton} from '@angular/material/button';
import {OrderProductFormComponent} from '../order-product-form/order-product-form.component';

@Component({
  selector: 'app-inventory',
  imports: [
    MatLabel,
    MatFormField,
    InventoryListComponent,
    MatButton,
    FormsModule,
    MatInput,
    NgIf,
    OrderProductFormComponent
  ],
  templateUrl: './inventory.component.html',
  standalone: true,
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  products: InventoryProduct[] = [];
  filteredProducts: InventoryProduct[] = [];
  filterCode: string = '';
  makeInventory!: boolean;

  ngOnInit(): void {
    // Simulación de productos (en producción, esto vendría de un servicio)
    this.products = [
      { id: 1, code: 'MED001', name: 'Paracetamol', stock: 20, purchaseDate: new Date('2025-08-01'), price: 10 },
      { id: 2, code: 'MED002', name: 'Ibuprofeno', stock: 15, purchaseDate: new Date('2025-08-10'), price: 8 },
      { id: 3, code: 'MED003', name: 'Amoxicilina', stock: 5, purchaseDate: new Date('2025-07-15'), price: 20 },
      { id: 4, code: 'ME003', name: 'Amoxicilina', stock: 5, purchaseDate: new Date('2025-07-15'), price: 15 },
    ];
    this.filteredProducts = this.products;
  }

  applyCodeFilter() {
    this.filteredProducts = this.products.filter(value => {
      return value.code.toLowerCase().includes(this.filterCode.toLowerCase());
    })
  }

  purchaseOrder() {
    this.makeInventory = !this.makeInventory;
  }

}
