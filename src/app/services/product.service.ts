import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AddProductForm, Categories, Listpro } from '../interface/product';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private errorDialogService = inject(ErrorService);
  private apiUrl = 'http://localhost:3000/products';
  private apiUrlcate = 'http://localhost:3000/categories';

  // Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    this.errorDialogService.showError(`An error occurred: ${error.message}`);
    return throwError(() => new Error(error.message));
  }


  searchProducts(term: string): Observable<Listpro[]> {
    return this.http.get<Listpro[]>(`${this.apiUrl}?q=${term}`);
  }

  getAllProducts() {
    return this.http.get<Listpro[]>(this.apiUrl).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAllcateGory() {
    return this.http.get<Categories[]>(this.apiUrlcate).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Get product by ID
  getProductDetail(id: number |string) {
    return this.http.get<Listpro>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  addProduct(data: AddProductForm) {
    return this.http.post(this.apiUrl, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Update an existing product
  updateProduct(id: number|string, data: AddProductForm) {
    return this.http.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Delete a product
  deleteProduct(id: string|number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }
}
