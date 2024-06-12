import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoginForm, RegisterForm } from '../interface/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  constructor() {}


  register(data: RegisterForm) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginForm){
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    return 'Khanh';
  }
}
