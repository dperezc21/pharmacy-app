import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductsFormComponent } from './sell-products-form.component';

describe('OrderFormComponent', () => {
  let component: SellProductsFormComponent;
  let fixture: ComponentFixture<SellProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellProductsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
