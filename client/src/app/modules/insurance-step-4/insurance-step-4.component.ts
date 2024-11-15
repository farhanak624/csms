import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
interface Insurance {
  insuranceType: string;
  policyNumber: string;
  provider: string;
  coverageAmount: number;
  startDate: string;
  endDate: string;
}
@Component({
  selector: 'app-insurance-step-4',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './insurance-step-4.component.html',
  styleUrl: './insurance-step-4.component.css',
})
export class InsuranceStep4Component {
  insuranceType: string = '';
  policyNumber: string = '';
  provider: string = '';
  coverageAmount: number | null = null;
  startDate: string = '';
  endDate: string = '';

  insurances: Insurance[] = [];
  
  private validateForm(): boolean {
    return (
      this.insuranceType !== '' &&
      this.policyNumber !== '' &&
      this.provider !== '' &&
      this.coverageAmount !== null &&
      this.startDate !== '' &&
      this.endDate !== ''
    );
  }
  private resetForm() {
    this.insuranceType = '';
    this.policyNumber = '';
    this.provider = '';
    this.coverageAmount = null;
    this.startDate = '';
    this.endDate = '';
  }
  addInsurance() {
    if (this.validateForm()) {
      const newInsurance: Insurance = {
        insuranceType: this.insuranceType,
        policyNumber: this.policyNumber,
        provider: this.provider,
        coverageAmount: this.coverageAmount!,
        startDate: this.startDate,
        endDate: this.endDate
      };

      this.insurances.push(newInsurance);
      this.resetForm();
      console.log('Insurance added:', newInsurance);
      console.log('All insurances:', this.insurances);
    } else {
      console.log('Form validation failed');
    }
  }

  removeInsurance(index: number) {
    this.insurances.splice(index, 1);
  }
  constructor() {}
}
