import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadStep5Component } from './file-upload-step-5.component';

describe('FileUploadStep5Component', () => {
  let component: FileUploadStep5Component;
  let fixture: ComponentFixture<FileUploadStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadStep5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
