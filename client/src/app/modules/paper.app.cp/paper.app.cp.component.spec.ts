import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperAppCpComponent } from './paper.app.cp.component';

describe('PaperAppCpComponent', () => {
  let component: PaperAppCpComponent;
  let fixture: ComponentFixture<PaperAppCpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperAppCpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperAppCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
