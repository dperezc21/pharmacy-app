import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductFormComponent } from './order-product-form.component';

describe('OrderProductFormComponent', () => {
  let component: OrderProductFormComponent;
  let fixture: ComponentFixture<OrderProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
