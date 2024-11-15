import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFillingComponent } from './applicant-filling.component';

describe('ApplicantFillingComponent', () => {
  let component: ApplicantFillingComponent;
  let fixture: ComponentFixture<ApplicantFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantFillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
