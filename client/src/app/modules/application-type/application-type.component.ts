import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-type',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './application-type.component.html',
  styleUrl: './application-type.component.css',
})
export class ApplicationTypeComponent implements OnInit {
  applicationTypeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.applicationTypeForm = this.fb.group({
      applicationType: [''],
      applicationName: [''],
      referral: [false],
    });
  }
  ngOnInit() {
    this.applicationTypeForm = this.fb.group({
      applicationType: ['', Validators.required],
      applicationName: ['', Validators.required],
      referral: [false],
    });
  }
  onSubmit() {
    if (this.applicationTypeForm.valid) {
      // Process the form data
      console.log('Form Submitted', this.applicationTypeForm.value);

      // Generate a 7-digit random unique number
      const applicationNumber = Math.floor(1000000 + Math.random() * 9000000);
      console.log('Application Number:', applicationNumber);

      // You can store this number or pass it to the next component as needed
      // For example, you could add it to the router navigation:
      localStorage.setItem('applicationNumber', applicationNumber.toString());

      this.router.navigate(['/paper-application-cp/applicant-filling']);
    } else {
      Object.keys(this.applicationTypeForm.controls).forEach((key) => {
        const control = this.applicationTypeForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  get f() {
    return this.applicationTypeForm.controls;
  }
}
