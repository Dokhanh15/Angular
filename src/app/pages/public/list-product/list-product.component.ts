import { Component, OnInit, inject } from '@angular/core';
import { Listpro } from '../../../interface/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
    RouterModule,
    NgxPaginationModule,// Add NgxPaginationModule here
  ],
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  products: Listpro[] = [];
  listProduct: Listpro[] = [];
  private _filterValue: string = '';
  p: number = 1; // Biến để theo dõi trang hiện tại

  productService = inject(ProductService);
  router = inject(Router); // Inject Router

  constructor() {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.listProduct = this.products;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  // Detail
  viewProductDetail(id: number): void {
    this.router.navigate(['/product', id]);
  }

  // Filler
  get filterValue(): string {
    return this._filterValue;
  }

  set filterValue(value: string) {
    this._filterValue = value.toLowerCase();
    this.filter();
  }

  filter(): void {
    const filterText = this._filterValue.toLowerCase();
    this.products = this.listProduct.filter((p) =>
      p.title.toLowerCase().includes(filterText)
    );
  }
}
