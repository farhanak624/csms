import { CommonModule, NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-file-upload-step-5',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
  ],
  templateUrl: './file-upload-step-5.component.html',
  styleUrl: './file-upload-step-5.component.css',
})
export class FileUploadStep5Component {
  serviceForm: FormGroup;

  readonly fileUploadPanel = signal(false);
  readonly serviceTypePanel = signal(false);
  categories = ['Application', 'Child', 'Correspondence', 'Custodial Party','income', 'medical'];
  documentTypes = ['Drivers License', 'Birth Certificate', 'Marriage Certificate', 'Passport', 'Social Security Card', 'Wage Documents','NCP Photograph','IWO Review/Hearing Date'];

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      FullServices: [false],
      LocateOnly: [false],
      PaternityOnly: [false],
      MedicalSupportOnly: [false],
      ChildSupportOnly: [false],
      ChildandSpousalSupportOnly: [false],
      category: [''],
      documentType: [''],
      file: [null] 
    });
  }

  onFormSubmit() {
    if (this.serviceForm.valid) {
      const selectedServices = Object.keys(this.serviceForm.value).filter(
        (key) => this.serviceForm.value[key]
      );
      console.log('Selected Services:', selectedServices);
      console.log('Category:', this.serviceForm.value.category);
      console.log('Document Type:', this.serviceForm.value.documentType);
      console.log('File:', this.serviceForm.value.file);
      // You can proceed with form submission logic here
    } else {
      console.error('Form is invalid');
    }
  }
  onFileChange(event: any){
    const file= (event.target as HTMLInputElement).files![0];
    this.serviceForm.patchValue({
      file: file
    })

  }
}
