import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimizeButton } from './minimize-button';

describe('MinimizeButton', () => {
  let component: MinimizeButton;
  let fixture: ComponentFixture<MinimizeButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimizeButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimizeButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
