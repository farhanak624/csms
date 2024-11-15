import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api/services/api.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, NgFor } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-applicant-filling',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    MatStepperModule,
    FormsModule,
  ],
  templateUrl: './applicant-filling.component.html',
  styleUrl: './applicant-filling.component.css',
})
export class ApplicantFillingComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() formDataChange = new EventEmitter<any>();
  incomes!: FormArray;
  totalIncome: number = 0;
  assets!: FormArray;

  readonly personalInfoPanelOpen = signal(false);
  readonly employmentInfo = signal(false);
  readonly custodialPartyInfo = signal(false);
  readonly benefitInfo = signal(false);
  readonly custodialPartyAttornyInfo = signal(false);
  readonly custodialPartyAssetInfo = signal(false);

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Assign the parent form to this component's form
    // this.form = this.parent.form;

    // Add new FormGroup to the parent form using addControl
    // Initialize form using FormBuilder
    this.form = this.fb.group({
      personal_information: this.fb.group({
        pers_in_firstname: [''],
        pers_in_middlename: [''],
        pers_in_lastname: [''],
        pers_in_suffix: [''],
        pers_in_maiden_name: [''],
        pers_in_nickname: [''],
        pers_in_dob: [''],
        pers_in_ssn_itin: [''],
        pers_in_gender: [''],
        pers_in_race: [''],
        pers_in_relationship_to_child: [''],
      }),
      custodial_party_alternative_name: this.fb.group({
        cp_firstname: [''],
        cp_middlename: [''],
        cp_lastname: [''],
        cp_suffix: [''],
      }),
      applicant_mailing_address: this.fb.group({
        app_ma_source: [''],
        app_ma_international_address: [''],
        app_ma_address_line_1: [''],
        app_ma_address_line_2: [''],
        app_ma_city: [''],
        app_ma_state: [''],
        app_ma_county: [''],
        app_ma_zipcode: [''],
        app_ma_country: [''],
      }),
      applicant_residential_address: this.fb.group({
        app_re_source: [''],
        app_re_international_address: [''],
        app_re_address_line_1: [''],
        app_re_address_line_2: [''],
        app_re_city: [''],
        app_re_state: [''],
        app_re_county: [''],
        app_re_zipcode: [''],
        app_re_home_phone: [''],
        app_re_business_phone: [''],
        app_re_cell_phone: [''],
        app_re_email: [''],
      }),
      nearest_relative_information: this.fb.group({
        ne_re_relation_to_applicant: [''],
        ne_re_firstname: [''],
        ne_re_lastname: [''],
        ne_re_phone: [''],
      }),
      relative_address: this.fb.group({
        rel_ad_source: [''],
        rel_ad_international_address: [''],
        rel_ad_address_line_1: [''],
        rel_ad_address_line_2: [''],
        rel_ad_city: [''],
        rel_ad_state: [''],
        rel_ad_county: [''],
        rel_ad_zipcode: [''],
        rel_ad_country: [''],
        rel_ad_family_violence: [''],
      }),
      custodial_party_income_info: this.fb.array([]), // Initialize FormArray correctly
      employer_info: this.fb.group({
        custodial_party_employed: [''],
      }),
      benefit_info: this.fb.group({
        current_tca_recipient: [''],
        former_tca_recipient: [''],
        temperory_cash_assist_applicant: [''],
        current_medical_assist_recipient: [''],
        former_medical_assist_recipient: [''],
        medical_assist_applicant: [''],
        finanacial_statement_provide: [''],
        payment_status: [''],
      }),
      custodial_party_attorny_info: this.fb.group({
        cp_at_firstname: [''],
        cp_at_middlename: [''],
        cp_at_lastname: [''],
        cp_at_phone: [''],
        cp_at_source: [''],
        cp_at_international_addrss: [''],
        cp_at_address_line_1: [''],
        cp_at_address_line_2: [''],
        cp_at_city: [''],
        cp_at_state: [''],
        cp_at_county: [''],
        cp_at_zipcode: [''],
        cp_at_country: [''],
      }),
      custodial_party_assets: this.fb.array([]),
    });

    // Assign the incomes FormArray from form
    this.incomes = this.form.get('custodial_party_income_info') as FormArray;
    this.assets = this.form.get('custodial_party_assets') as FormArray;
    
    this.form.valueChanges.subscribe((value) => {
      this.formDataChange.emit(value);
    });
  }
  get income(): FormArray {
    return this.form.get('custodial_party_income_info') as FormArray;
  }
  togglePanel(panel: string): void {
    // Example method to toggle panel state
    this.form
      .get(panel)
      ?.patchValue({ expanded: !this.form.get(panel)?.value.expanded });
  }

  get totalIncomes(): number {
    return this.incomes.controls.reduce((acc, group) => {
      const amount = group.get('incomeAmount')?.value || 0;
      return acc + amount;
    }, 0);
  }

  addIncomeControl(): void {
    this.incomes.push(
      this.fb.group({
        incomeType: ['', Validators.required],
        incomeFrequency: ['', Validators.required],
        incomeAmount: ['', [Validators.required, Validators.min(0)]],
      })
    );
  }
  addAssetControl(): void {
    this.assets.push(
      this.fb.group({
        type: ['', Validators.required],
        value: ['', [Validators.required, Validators.min(0)]],
      })
    );
    console.log(this.assets.value);
  }

  removeIncomeControl(index: number): void {
    this.incomes.removeAt(index);
  }

  removeAssetControl(index: number): void {
    this.assets.removeAt(index);
  }
}
