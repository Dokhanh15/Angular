import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Listpro } from '../../interface/product';
import { ProductService } from '../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf,FormsModule,NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchTerm: string = '';
  suggestions: Listpro[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onSearchInput(): void {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm.trim()).subscribe(
        (products) => this.suggestions = products
      );
    } else {
      this.suggestions = [];
    }
  }

  onSelectSuggestion(suggestion: Listpro): void {
    this.suggestions = [];
    this.router.navigate(['/', suggestion.id]);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm.trim() } });
    }
  }
}
