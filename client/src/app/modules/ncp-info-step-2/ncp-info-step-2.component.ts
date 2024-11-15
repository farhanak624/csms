import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { ApiService } from '../../api/services/api.service';

@Component({
  selector: 'app-ncp-info-step-2',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
    MatStepperModule,
  ],
  templateUrl: './ncp-info-step-2.component.html',
  styleUrl: './ncp-info-step-2.component.css',
})
export class NcpInfoStep2Component implements OnInit{
  @Input() ncp_incomes!: FormArray;
  @Input() form!: FormGroup;
  @Output() formDataChange = new EventEmitter<any>();
  // ncpInfoForm: FormGroup;

  readonly ncpPersonalInfo = signal(false);
  readonly ncpAlternativeInfo = signal(false);
  readonly ncpMilitaryInfo = signal(false);
  readonly ncpIncarcerationInfo = signal(false);
  readonly ncpNearestRelationInfo = signal(false);
  readonly ncpMotherInfo = signal(false);
  readonly ncpFatherInfo = signal(false);
  readonly ncpEmployerInfo = signal(false);
  readonly ncpAttornyInfo = signal(false);
  readonly ncpIncomeExpenseInfo = signal(false);
  readonly ncpAssetInfo = signal(false);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ){
    
  }
  ngOnInit():void{
    this.ncp_incomes = this.fb.array([]);
    this.form = this.fb.group({
      ncp_personal_info: this.fb.group({
        ncp_pi_firstname: [''],
        ncp_pi_middlename: [''],
        ncp_pi_lastname: [''],
        ncp_pi_suffix: [''],
        ncp_pi_maiden_name: [''],
        ncp_pi_nickname: [''],
        ncp_pi_aproximate_age: [''],
        ncp_pi_source: [''],
        ncp_pi_international_address: [''],
        ncp_pi_address_line_1: [''],
        ncp_pi_address_line_2: [''],
        ncp_pi_city: [''],
        ncp_pi_state: [''],
        ncp_pi_county: [''],
        ncp_pi_zipcode: [''],
        ncp_pi_country: [''],
        ncp_pi_home_phone: [''],
        ncp_pi_business_phone: [''],
        ncp_pi_cell_phone: [''],
        ncp_pi_email: [''],
        ncp_pi_eye_color: [''],
        ncp_pi_hair_color: [''],
        ncp_pi_height_ft: [''],
        ncp_pi_height_in: [''],
        ncp_pi_identification_marks: [''],
        ncp_pi_weight_lbs: [''],
        ncp_pi__driver_license: [''],
        ncp_pi_place_of_birth_city: [''],
        ncp_pi_place_of_birth_state: [''],
        ncp_pi_marital_status: [''],
        ncp_pi_citizen_status: [''],
        ncp_pi_dob: [''],
        ncp_pi_ssn_itin: [''],
        ncp_pi_gender: [''],
        ncp_pi_race: [''],
        ncp_pi_relationship_to_child: [''],
        ncp_pi_member_of_union_local: [''],
      }),
      ncp_alternative_name: this.fb.group({
        ncp_an_firstname: [''],
        ncp_an_middlename: [''],
        ncp_an_lastname: [''],
        ncp_an_suffix: [''],
      }),
      ncp_militaryInfo: this.fb.group({
        ncp_military_served_status: [''],
      }),
      ncp_incarcerationInfo: this.fb.group({
        ncp_jail_status: [''],
      }),
      ncp_nearest_relationship_info: this.fb.group({
        ncp_nr_relation_to_ncp: [''],
        ncp_nr_firstname: [''],
        ncp_nr_middlename: [''],
        ncp_nr_lastname: [''],
        ncp_nr_phone: [''],
        ncp_nr_source: [''],
        ncp_nr_international_addrss: [''],
        ncp_nr_address_line_1: [''],
        ncp_nr_address_line_2: [''],
        ncp_nr_city: [''],
        ncp_nr_state: [''],
        ncp_nr_county: [''],
        ncp_nr_zipcode: [''],
        ncp_nr_country: [''],
      }),
      ncp_mother_info: this.fb.group({
        ncp_mother_firstname: [''],
        ncp_mother_middlename: [''],
        ncp_mother_lastname: [''],
        ncp_mother_source: [''],
        ncp_mother_international_address: [''],
        ncp_mother_address_line_1: [''],
        ncp_mother_address_line_2: [''],
        ncp_mother_city: [''],
        ncp_mother_state: [''],
        ncp_mother_county: [''],
        ncp_mother_zipcode: [''],
        ncp_mother_country: [''],
        ncp_mother_phone: [''],
      }),
      ncp_father_info: this.fb.group({
        ncp_father_firstname: [''],
        ncp_father_middlename: [''],
        ncp_father_lastname: [''],
        ncp_father_source: [''],
        ncp_father_international_address: [''],
        ncp_father_address_line_1: [''],
        ncp_father_address_line_2: [''],
        ncp_father_city: [''],
        ncp_father_state: [''],
        ncp_father_county: [''],
        ncp_father_zipcode: [''],
        ncp_father_country: [''],
        ncp_father_phone: [''],
      }),
      ncp_employer_info: this.fb.group({
        ncp_employed: [''],
      }),
      ncp_income_expense_info: this.fb.group({
        ncp_property_buisness_permit_license: [''],
        ncp_type: [''],
        ncp_other_child_support_case: [''],
        ncp_state: [''],
      }),
      ncp_income: this.ncp_incomes,
      ncp_attorny_info: this.fb.group({
        ncp_at_firstname: [''],
        ncp_at_middlename: [''],
        ncp_at_lastname: [''],
        ncp_at_phone: [''],
        ncp_at_source: [''],
        ncp_at_international_addrss: [''],
        ncp_at_address_line_1: [''],
        ncp_at_address_line_2: [''],
        ncp_at_city: [''],
      }),
      ncp_asset_info: this.fb.group({
        ncp_asset_info: [''],
      }),
      // NCP Info form fields...
    });
    
    this.form.valueChanges.subscribe(value => {
      this.formDataChange.emit(value);
    });
  }
  onSubmit(): void {
    console.log('NCP Info Form Data:', this.form.value);
  }
}
