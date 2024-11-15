import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { _MatInternalFormField } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-support-step-3',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './support-step-3.component.html',
  styleUrl: './support-step-3.component.css',
})
export class SupportStep3Component implements OnInit {
  @Input() form!: FormGroup;
  savedChildren: any[] = []; // Array to store saved children
  @Output() formDataChange = new EventEmitter<any>();

  relationshipStatusOptions = ['Married', 'Separated', 'Divorced'];
  countryOptions = ['USA', 'Canada', 'Mexico'];
  stateOptions = ['California', 'Texas', 'New York'];
  countyOptions = ['County 1', 'County 2', 'County 3'];
  suffixOptions = ['Jr.', 'Sr.', 'II', 'III', 'IV'];
  raceOptions = [
    'Asian',
    'Black or African American',
    'Caucasian',
    'Hispanic or Latino',
    'Native American',
    'Other',
  ];
  relationshipToApplicantOptions = [
    'Biological Child',
    'Stepchild',
    'Adopted Child',
    'Other',
  ];
  genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  readonly relationShipPanel = signal(false);
  readonly childInfoPanel = signal(false);

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    if (!this.form) {
      this.initializeForm(); // Check if form is provided as input before initializing
    }
    
  }
  initializeForm(): void {
    this.form = this.fb.group({
      relationshipStatus: ['', Validators.required],
      dateMarried: [''],
      dateSeparated: [''],
      countrySeparated: [''],
      stateSeparated: [''],
      countySeparated: [''],
      divorceProceedings: ['', Validators.required],
      childSupportIncluded: ['', Validators.required],
      children: this.fb.array([
        this.createChildFormGroup(), // Add the first child group
      ]),
    });

    this.form.valueChanges.subscribe(() => {
      this.formDataChange.emit(this.form.value);
    });
  }
  get children(): FormArray {
    return this.form.get('children') as FormArray;
  }
  createChildFormGroup(): FormGroup {
    return this.fb.group({
      childFirstName: ['', Validators.required],
      childMiddleName: [''],
      childLastName: ['', Validators.required],
      suffix: [''],
      race: [''],
      relationshipToApplicant: [''],
      conceptionOccurredState: [''],
      gender: [''],
      birthState: [''],
      birthCounty: [''],
      birthCity: [''],
      dateOfBirth: ['', Validators.required],
      marriedAtBirth: ['', Validators.required],
      childSupportOrder: ['', Validators.required],
      ncParentPaysSupport: ['', Validators.required],
      paySupportTo: ['', Validators.required],
    });
  }
  saveChildInfo() {
    // Get the form value for the first child in the FormArray
    const childInfo = this.children.at(0).value;
    this.savedChildren.push(childInfo); // Add to the savedChildren array
    console.log('sufygafga', this.savedChildren);
    this.children.clear(); // Clear the form array
    this.addChild(); // Reinitialize the form with a new empty group
  }
  deleteChild(index: number) {
    this.savedChildren.splice(index, 1); // Remove child from savedChildren array
  }
  addChild() {
    this.children.push(this.createChildFormGroup());
  }
  removeChild(index: number) {
    this.children.removeAt(index);
  }
  onSubmit() {
    if (this.form.valid) {
      // Process the form data
      console.log(this.form.value);
    } else {
      // Handle form errors
      console.log('Form is not valid!');
    }
  }
}
