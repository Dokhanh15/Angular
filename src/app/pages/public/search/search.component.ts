import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Listpro } from '../../../interface/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';
  products: Listpro[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      if (this.searchTerm) {
        this.productService.searchProducts(this.searchTerm).subscribe(
          (products) => this.products = products
        );
      }
    });
  }
}
