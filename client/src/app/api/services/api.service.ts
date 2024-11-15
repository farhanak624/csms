import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3004/api/v1/users';

  constructor(private http: HttpClient) {}

  signup(
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, {
      firstname,
      lastname,
      email,
      username,
      password,
    });
  }
  login(email: string, password: string): Observable<any> {
    console.log('in api service', email, password);
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }
  searchUsers(
    firstname: string,
    lastname: string,
    case_no: string
  ): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(
      `${this.baseUrl}/search?firstname=${firstname}&lastname=${
        lastname ? lastname : ''
      }&case_no=${case_no ? case_no : ''}`,
      { headers }
    );
  }
  registerApplicant(applicantData: any): Observable<any> {
    const headers = this.getHeaders();
    console.log('in api service', applicantData);
    return this.http.post<any>(`${this.baseUrl}/applicant-register`, applicantData, { headers });
  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
