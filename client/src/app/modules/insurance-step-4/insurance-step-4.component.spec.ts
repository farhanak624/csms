import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceStep4Component } from './insurance-step-4.component';

describe('InsuranceStep4Component', () => {
  let component: InsuranceStep4Component;
  let fixture: ComponentFixture<InsuranceStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceStep4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
