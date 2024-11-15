import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SignupComponent } from './modules/signup/signup.component';
import { LoginComponent } from './modules/login/login.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthRedirectGuard } from './shared/guard/auth.redirect.guard';
import { PaperAppCpComponent } from './modules/paper.app.cp/paper.app.cp.component';
import { ApplicantFillingComponent } from './modules/applicant-filling/applicant-filling.component';
import { NcpInfoStep2Component } from './modules/ncp-info-step-2/ncp-info-step-2.component';
import { SupportStep3Component } from './modules/support-step-3/support-step-3.component';
import { InsuranceStep4Component } from './modules/insurance-step-4/insurance-step-4.component';
import { FileUploadStep5Component } from './modules/file-upload-step-5/file-upload-step-5.component';
import { SuccessStep6Component } from './modules/success-step-6/success-step-6.component';
import { ApplicationTypeComponent } from './modules/application-type/application-type.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'application-type',
        component: ApplicationTypeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'paper-application-cp',
        component: PaperAppCpComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'applicant-filling',
            pathMatch: 'full',
          },
          {
            path: 'applicant-filling',
            component: ApplicantFillingComponent,
          },
          {
            path: 'ncp-info',
            component: NcpInfoStep2Component,
          },
          {
            path: 'support-info',
            component: SupportStep3Component,
          },
          {
            path: 'insurance-info',
            component: InsuranceStep4Component,
          },
          {
            path: 'file-upload',
            component: FileUploadStep5Component,
          },
          {
            path: 'success',
            component: SuccessStep6Component,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: '**', redirectTo: '/login' },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
