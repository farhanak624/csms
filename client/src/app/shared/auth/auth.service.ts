import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true :false;
  }
  login(token: string): void {
    localStorage.setItem('token', token);
  }
}
