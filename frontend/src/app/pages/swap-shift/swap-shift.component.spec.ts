import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapShiftComponent } from './swap-shift.component';

describe('SwapShiftComponent', () => {
  let component: SwapShiftComponent;
  let fixture: ComponentFixture<SwapShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapShiftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwapShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
