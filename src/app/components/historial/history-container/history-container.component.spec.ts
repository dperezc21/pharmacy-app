import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryContainerComponent } from './history-container.component';

describe('HistoryComponent', () => {
  let component: HistoryContainerComponent;
  let fixture: ComponentFixture<HistoryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
