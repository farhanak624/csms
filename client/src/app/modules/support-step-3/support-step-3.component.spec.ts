import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportStep3Component } from './support-step-3.component';

describe('SupportStep3Component', () => {
  let component: SupportStep3Component;
  let fixture: ComponentFixture<SupportStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
