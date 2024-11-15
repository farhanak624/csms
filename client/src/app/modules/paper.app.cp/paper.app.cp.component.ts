import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ApiService } from '../../api/services/api.service';
import { catchError, tap } from 'rxjs';
import { NotifierModule } from 'angular-notifier';
import { NotifierService } from 'angular-notifier';
import { CommonModule, NgFor } from '@angular/common';
import { ApplicantFillingComponent } from '../applicant-filling/applicant-filling.component';
import { NcpInfoStep2Component } from '../ncp-info-step-2/ncp-info-step-2.component';
import { Router, RouterOutlet } from '@angular/router';
import { SupportStep3Component } from '../support-step-3/support-step-3.component';
import { InsuranceStep4Component } from '../insurance-step-4/insurance-step-4.component';
import { FileUploadStep5Component } from '../file-upload-step-5/file-upload-step-5.component';
import { SuccessStep6Component } from '../success-step-6/success-step-6.component';

@Component({
  selector: 'app-paper.app.cp',
  standalone: true,
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NotifierModule,
    NgFor,
    CommonModule,
    MatStepperModule,
    ApplicantFillingComponent,
    NcpInfoStep2Component,
    RouterOutlet,
    SupportStep3Component,
    InsuranceStep4Component,
    FileUploadStep5Component,
    SuccessStep6Component
  ],
  templateUrl: './paper.app.cp.component.html',
  styleUrl: './paper.app.cp.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperAppCpComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  currentStep: number = 0; // Track the current step
  maxSteps: number = 6; // Total number of steps
  incomes!: FormArray;
  personalInformationForm: FormGroup;
  ncp_incomes!: FormArray;
  totalIncome: number = 0;
  applicantForm!: FormGroup;
  ncpInfoForm!: FormGroup;
  supportForm!: FormGroup;
  insuranceForm!: FormGroup;
  fileUpload!: FormGroup;
  success!: FormGroup;
  assets!:FormArray;

  readonly personalInfoPanelOpen = signal(false);
  readonly employmentInfo = signal(false);
  readonly custodialPartyInfo = signal(false);
  readonly benefitInfo = signal(false);
  readonly custodialPartyAttornyInfo = signal(false);
  readonly custodialPartyAssetInfo = signal(false);
  applicationNumber= localStorage.getItem('applicationNumber');

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notifierService: NotifierService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.applicantForm = this.fb.group({
      personalInformation: this.fb.group({}),
      ncpInfo: this.fb.group({}),
      support: this.fb.group({}),
      insurance: this.fb.group({}),
      fileUpload: this.fb.group({}),
      success: this.fb.group({})
    });

    this.personalInformationForm = this.applicantForm.get('personalInformation') as FormGroup;
    this.ncpInfoForm = this.applicantForm.get('ncpInfo') as FormGroup;
    this.supportForm = this.applicantForm.get('support') as FormGroup;
    this.insuranceForm = this.applicantForm.get('insurance') as FormGroup;
    this.fileUpload = this.applicantForm.get('fileUpload') as FormGroup;
    this.success = this.applicantForm.get('success') as FormGroup;
  }
  updateFormData(stepName: string, formData: any) {
    this.applicantForm.get(stepName)?.patchValue(formData);
  }
  // ngOnInit(): void {
  //   this.incomes = this.fb.array([]);
  //   this.ncp_incomes = this.fb.array([]);

  //   this.applicantForm = this.fb.group({
  //     personal_information: this.applicantForm = this.fb.group({
  //       pers_in_firstname: [''],
  //       pers_in_middlename: [''],
  //       pers_in_lastname: [''],
  //       pers_in_suffix: [''],
  //       pers_in_maiden_name: [''],
  //       pers_in_nickname: [''],
  //       pers_in_dob: [''],
  //       pers_in_ssn_itin: [''],
  //       pers_in_gender: [''],
  //       pers_in_race: [''],
  //       pers_in_relationship_to_child: [''],
  //     }),
  //     custodial_party_alternative_name: this.fb.group({
  //       cp_firstname: [''],
  //       cp_middlename: [''],
  //       cp_lastname: [''],
  //       cp_suffix: [''],
  //     }),
  //     applicant_mailing_address: this.fb.group({
  //       app_ma_source: [''],
  //       app_ma_international_address: [''],
  //       app_ma_address_line_1: [''],
  //       app_ma_address_line_2: [''],
  //       app_ma_city: [''],
  //       app_ma_state: [''],
  //       app_ma_county: [''],
  //       app_ma_zipcode: [''],
  //       app_ma_country: [''],
  //     }),
  //     applicant_residential_address: this.fb.group({
  //       app_re_source: [''],
  //       app_re_international_address: [''],
  //       app_re_address_line_1: [''],
  //       app_re_address_line_2: [''],
  //       app_re_city: [''],
  //       app_re_state: [''],
  //       app_re_county: [''],
  //       app_re_zipcode: [''],
  //       app_re_home_phone: [''],
  //       app_re_business_phone: [''],
  //       app_re_cell_phone: [''],
  //       app_re_email: [''],
  //     }),
  //     nearest_relative_information: this.fb.group({
  //       ne_re_relation_to_applicant: [''],
  //       ne_re_firstname: [''],
  //       ne_re_lastname: [''],
  //       ne_re_phone: [''],
  //     }),
  //     relative_address: this.fb.group({
  //       rel_ad_source: [''],
  //       rel_ad_international_address: [''],
  //       rel_ad_address_line_1: [''],
  //       rel_ad_address_line_2: [''],
  //       rel_ad_city: [''],
  //       rel_ad_state: [''],
  //       rel_ad_county: [''],
  //       rel_ad_zipcode: [''],
  //       rel_ad_country: [''],
  //       rel_ad_family_violence: [''],
  //     }),
  //     custodial_party_income_info: this.incomes,
  //     employer_info: this.fb.group({
  //       custodial_party_employed: [''],
  //     }),
  //     benefit_info: this.fb.group({
  //       current_tca_recipient: [''],
  //       former_tca_recipient: [''],
  //       temperory_cash_assist_applicant: [''],
  //       current_medical_assist_recipient: [''],
  //       former_medical_assist_recipient: [''],
  //       medical_assist_applicant: [''],
  //       finanacial_statement_provide: [''],
  //       payment_status: [''],
  //     }),
  //     custodial_party_attorny_info: this.fb.group({
  //       cp_at_firstname: [''],
  //       cp_at_middlename: [''],
  //       cp_at_lastname: [''],
  //       cp_at_phone: [''],
  //       cp_at_source: [''],
  //       cp_at_international_addrss: [''],
  //       cp_at_address_line_1: [''],
  //       cp_at_address_line_2: [''],
  //       cp_at_city: [''],
  //       cp_at_state: [''],
  //       cp_at_county: [''],
  //       cp_at_zipcode: [''],
  //       cp_at_country: [''],
  //     }),
  //     custodial_party_assets:this.fb.array([])
      
  //   });
  //   this.ncpInfoForm = this.fb.group({
  //     ncp_personal_info: this.fb.group({
  //       ncp_pi_firstname: [''],
  //       ncp_pi_middlename: [''],
  //       ncp_pi_lastname: [''],
  //       ncp_pi_suffix: [''],
  //       ncp_pi_maiden_name: [''],
  //       ncp_pi_nickname: [''],
  //       ncp_pi_aproximate_age: [''],
  //       ncp_pi_source: [''],
  //       ncp_pi_international_address: [''],
  //       ncp_pi_address_line_1: [''],
  //       ncp_pi_address_line_2: [''],
  //       ncp_pi_city: [''],
  //       ncp_pi_state: [''],
  //       ncp_pi_county: [''],
  //       ncp_pi_zipcode: [''],
  //       ncp_pi_country: [''],
  //       ncp_pi_home_phone: [''],
  //       ncp_pi_business_phone: [''],
  //       ncp_pi_cell_phone: [''],
  //       ncp_pi_email: [''],
  //       ncp_pi_eye_color: [''],
  //       ncp_pi_hair_color: [''],
  //       ncp_pi_height_ft: [''],
  //       ncp_pi_height_in: [''],
  //       ncp_pi_identification_marks: [''],
  //       ncp_pi_weight_lbs: [''],
  //       ncp_pi__driver_license: [''],
  //       ncp_pi_place_of_birth_city: [''],
  //       ncp_pi_place_of_birth_state: [''],
  //       ncp_pi_marital_status: [''],
  //       ncp_pi_citizen_status: [''],
  //       ncp_pi_dob: [''],
  //       ncp_pi_ssn_itin: [''],
  //       ncp_pi_gender: [''],
  //       ncp_pi_race: [''],
  //       ncp_pi_relationship_to_child: [''],
  //       ncp_pi_member_of_union_local: [''],
  //     }),
  //     ncp_alternative_name: this.fb.group({
  //       ncp_an_firstname: [''],
  //       ncp_an_middlename: [''],
  //       ncp_an_lastname: [''],
  //       ncp_an_suffix: [''],
  //     }),
  //     ncp_militaryInfo: this.fb.group({
  //       ncp_military_served_status: [''],
  //     }),
  //     ncp_incarcerationInfo: this.fb.group({
  //       ncp_jail_status: [''],
  //     }),
  //     ncp_nearest_relationship_info: this.fb.group({
  //       ncp_nr_relation_to_ncp: [''],
  //       ncp_nr_firstname: [''],
  //       ncp_nr_middlename: [''],
  //       ncp_nr_lastname: [''],
  //       ncp_nr_phone: [''],
  //       ncp_nr_source: [''],
  //       ncp_nr_international_addrss: [''],
  //       ncp_nr_address_line_1: [''],
  //       ncp_nr_address_line_2: [''],
  //       ncp_nr_city: [''],
  //       ncp_nr_state: [''],
  //       ncp_nr_county: [''],
  //       ncp_nr_zipcode: [''],
  //       ncp_nr_country: [''],
  //     }),
  //     ncp_mother_info: this.fb.group({
  //       ncp_mother_firstname: [''],
  //       ncp_mother_middlename: [''],
  //       ncp_mother_lastname: [''],
  //       ncp_mother_source: [''],
  //       ncp_mother_international_address: [''],
  //       ncp_mother_address_line_1: [''],
  //       ncp_mother_address_line_2: [''],
  //       ncp_mother_city: [''],
  //       ncp_mother_state: [''],
  //       ncp_mother_county: [''],
  //       ncp_mother_zipcode: [''],
  //       ncp_mother_country: [''],
  //       ncp_mother_phone: [''],
  //     }),
  //     ncp_father_info: this.fb.group({
  //       ncp_father_firstname: [''],
  //       ncp_father_middlename: [''],
  //       ncp_father_lastname: [''],
  //       ncp_father_source: [''],
  //       ncp_father_international_address: [''],
  //       ncp_father_address_line_1: [''],
  //       ncp_father_address_line_2: [''],
  //       ncp_father_city: [''],
  //       ncp_father_state: [''],
  //       ncp_father_county: [''],
  //       ncp_father_zipcode: [''],
  //       ncp_father_country: [''],
  //       ncp_father_phone: [''],
  //     }),
  //     ncp_employer_info: this.fb.group({
  //       ncp_employed: [''],
  //     }),
  //     ncp_income_expense_info: this.fb.group({
  //       ncp_property_buisness_permit_license: [''],
  //       ncp_type: [''],
  //       ncp_other_child_support_case: [''],
  //       ncp_state: [''],
  //     }),
  //     ncp_income: this.ncp_incomes,
  //     ncp_attorny_info: this.fb.group({
  //       ncp_at_firstname: [''],
  //       ncp_at_middlename: [''],
  //       ncp_at_lastname: [''],
  //       ncp_at_phone: [''],
  //       ncp_at_source: [''],
  //       ncp_at_international_addrss: [''],
  //       ncp_at_address_line_1: [''],
  //       ncp_at_address_line_2: [''],
  //       ncp_at_city: [''],
  //     }),
  //     ncp_asset_info: this.fb.group({
  //       ncp_asset_info: [''],
  //     }),
  //     // NCP Info form fields...
  //   });

  //   this.supportForm = this.fb.group({
  //     // Support form fields...
  //   });
  //   this.insuranceForm = this.fb.group({
  //     // Insurance form fields...
  //   });
  //   this.fileUpload = this.fb.group({
  //     // File upload form fields...
  //   });
  //   this.success = this.fb.group({
  //     // Success form fields...
  //   });
  //   if (!this.applicantForm.get('personal_information')) {
  //     console.error("FormGroup 'personal_information' does not exist!");
  //   }
  //   this.incomes = this.applicantForm.get('custodial_party_income_info') as FormArray;
  //   this.assets = this.applicantForm.get('custodial_party_assets') as FormArray;
  // }
  // get personalInformationForms(): FormGroup {
    
  //   return this.applicantForm.get('personal_information') as FormGroup;
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['incomes']) {
      this.cdr.detectChanges();
    }
  }
  updatePersonalInfo(formValue: any) {
    this.personalInformationForm.patchValue(formValue);
    this.applicantForm.patchValue({ personalInfo: formValue });
  }

  updateNcpInfo(formValue: any) {
    this.ncpInfoForm.patchValue(formValue);
    this.applicantForm.patchValue({ ncpInfo: formValue });
  }

  updateSupportInfo(formValue: any) {
    this.supportForm.patchValue(formValue);
    this.applicantForm.patchValue({ supportInfo: formValue });
  }

  updateInsuranceInfo(formValue: any) {
    this.insuranceForm.patchValue(formValue);
    this.applicantForm.patchValue({ insuranceInfo: formValue });
  }

  updateFileUpload(formValue: any) {
    this.fileUpload.patchValue(formValue);
    this.applicantForm.patchValue({ fileUpload: formValue });
  }
  onSubmit() {
    console.log('hello');
    console.log('this.applicantForm.valid', this.applicantForm.valid);
    if (this.applicantForm.valid) {
      console.log('123');
      console.log(this.applicantForm.value);
      // You can then send this data to your backend
      this.apiService
        .registerApplicant(this.applicantForm.value)
        .pipe(
          tap((response) => {
            console.log('Success', response);
            // this.notifier.notify(
            //   'success',
            //   'Successfully registered applicant'
            // );
          }),
          catchError((error) => {
            console.log(error);
            return error;
          })
        )
        .subscribe();
    }
  }
  addIncome() {
    console.log('hello IN ADD INCOME');
    this.incomes.push(
      this.fb.group({
        incomeType: [''],
        incomeAmount: [''],
        incomeFrequency: [''],
      })
    );
    // this.incomes.push(incomeFormGroup);
    // console.log('Adding Income:', incomeFormGroup.value);
    this.calculateTotalIncome();
    console.log('Incomes FormArray:', this.incomes.value);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    // this.notifier.notify('success', 'Income added successfully');
  }
  addNcpIncome() {
    console.log('hello IN ADD INCOME');
    this.ncp_incomes.push(
      this.fb.group({
        incomeType: [''],
        incomeAmount: [''],
        incomeFrequency: [''],
      })
    );
    // this.incomes.push(incomeFormGroup);
    // console.log('Adding Income:', incomeFormGroup.value);
    this.calculateTotalIncome();
    console.log('Incomes FormArray:', this.incomes.value);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    // this.notifier.notify('success', 'Income added successfully');
  }
  calculateTotalIncome() {
    this.totalIncome = this.incomes.controls.reduce((acc, control) => {
      const incomeAmount = control.get('incomeAmount')?.value || 0;
      return acc + parseFloat(incomeAmount);
    }, 0);
    console.log('Total Income Calculated:', this.totalIncome);
  }
  goToPreviousStep() {
    console.log("this.currentStep", this.currentStep);
    if (this.currentStep > 0) {
      this.currentStep--; // Decrease the step index
      this.navigateToStep(this.currentStep);
    }
  }
  // goToNextStep() {
  //   console.log("this.currentStep", this.currentStep);
  //   switch (this.currentStep) {
  //     case 0: // First step: Applicant Filling
  //       this.handleApplicantFilling();
  //       break;
  //     case 1: // Second step: NCP Info
  //       this.handleNCPInfo();
  //       break;
  //     case 2: // Third step: Support
  //       this.handleSupport();
  //       break;
  //     case 3: // Fourth step: Insurance
  //       this.handleInsurance();
  //       break;
  //     case 4: // Fifth step: File Upload
  //       this.handleFileUpload();
  //       break;
  //     case 5: // Sixth step: Success
  //       this.handleSuccess();
  //       break;
  //     default:
  //       break;
  //   }
  // }
  navigateToStep(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        this.router.navigate(['paper-application-cp/applicant-filling']);
        break;
      case 1:
        this.router.navigate(['paper-application-cp/ncp-info']);
        break;
      case 2:
        this.router.navigate(['paper-application-cp/support-info']);
        break;
      case 3:
        this.router.navigate(['paper-application-cp/insurance-info']);
        break;
      case 4:
        this.router.navigate(['paper-application-cp/file-upload']);
        break;
      case 5:
        this.router.navigate(['paper-application-cp/success']);
        break;
      default:
        break;
    }
    if (this.currentStep < 5) {
      this.currentStep++;
      this.navigateToStep(this.currentStep);
    }
  }

  handleApplicantFilling() {
    // Perform actions related to applicant filling
    // Validate form, save data, etc.
    // if (/* Validation logic */) {
    // Navigate to the next step
    this.router.navigate(['paper-application-cp/ncp-info']);
    this.currentStep++;
    // } else {
    // Handle validation errors
    // }
  }

  handleNCPInfo() {
    // Perform actions related to NCP info
    // if (/* Validation logic */) {
    this.router.navigate(['paper-application-cp/support-info']);
    this.currentStep++;
    // } else {
    // Handle validation errors
    // }
  }

  handleSupport() {
    // Perform actions related to support
    // if (/* Validation logic */) {
    this.router.navigate(['paper-application-cp/insurance-info']);
    this.currentStep++;
    // } else {
    // Handle validation errors
  }

  handleInsurance() {
    // Perform actions related to insurance
    // if (/* Validation logic */) {
    this.router.navigate(['paper-application-cp/file-upload']);
    this.currentStep++;
    // } else {
    // Handle validation errors
    // }
  }

  handleFileUpload() {
    // Perform actions related to file upload
    // if (/* Validation logic */) {
    this.router.navigate(['paper-application-cp/success']);
    this.currentStep++;
    // } else {
    // Handle validation errors
    // }
  }

  handleSuccess() {
    // Actions on the success page
  }
}
