import { Injectable, inject } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private errorDialogService = inject(ErrorService);
  apiUrl = 'http://localhost:3000/users';
  http = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    this.errorDialogService.showError(`An error occurred: ${error.message}`);
    return throwError(() => new Error(error.message));
  }



  getAllUser() {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }
  getUserById(id: number|string) {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }
  deleteUser(id: number|string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }
  constructor() { }
}
