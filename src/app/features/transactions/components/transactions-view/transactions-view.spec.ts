import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsView } from './transactions-view';

describe('TransactionsView', () => {
  let component: TransactionsView;
  let fixture: ComponentFixture<TransactionsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
