import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorgageCalculatorComponent } from './morgage-calculator.component';

describe('MorgageCalculatorComponent', () => {
  let component: MorgageCalculatorComponent;
  let fixture: ComponentFixture<MorgageCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MorgageCalculatorComponent]
    });
    fixture = TestBed.createComponent(MorgageCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
