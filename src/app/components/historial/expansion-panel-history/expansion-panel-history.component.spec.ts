import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelHistoryComponent } from './expansion-panel-history.component';

describe('ExpansionPanelHistoryComponent', () => {
  let component: ExpansionPanelHistoryComponent;
  let fixture: ComponentFixture<ExpansionPanelHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionPanelHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionPanelHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
