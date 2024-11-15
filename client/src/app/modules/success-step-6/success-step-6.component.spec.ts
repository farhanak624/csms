import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStep6Component } from './success-step-6.component';

describe('SuccessStep6Component', () => {
  let component: SuccessStep6Component;
  let fixture: ComponentFixture<SuccessStep6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessStep6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
