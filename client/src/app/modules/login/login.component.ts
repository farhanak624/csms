import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api/services/api.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { NotifierModule } from 'angular-notifier';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NotifierModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly notifier: NotifierService;
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router,notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  onSubmit() {
    console.log('Login Form Submitted');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.apiService
      .login(this.email, this.password)
      .pipe(
        tap((response) => {
          console.log('Login successful', response);
          this.notifier.notify(
            'success',
            'Successfully Logged In'
          );
          
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.user.accessToken);
          return this.router.navigate(['/home']);
        }),
        catchError((error) => {
          console.error('Login failed', error);
          alert("Invalid Credentials");
          return this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }
}
