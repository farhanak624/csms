import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcpInfoStep2Component } from './ncp-info-step-2.component';

describe('NcpInfoStep2Component', () => {
  let component: NcpInfoStep2Component;
  let fixture: ComponentFixture<NcpInfoStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcpInfoStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcpInfoStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
