import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Listpro } from '../../../interface/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  product: Listpro | undefined;
  productId: number|string | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.productId = String(id);

        if (this.productId) {
          this.productService.getProductDetail(this.productId).subscribe({
            next: (product) => {
              this.product = product;
            },
            error: (error) => {
              console.error('Error fetching product details:', error);
              this.router.navigate(['404']);
            },
          });
        }
      }
    });
  }

  addToCart() {
  }

  buyNow() {
  }

  increaseQuantity() {
    this.quantity = this.quantity + 1;
  }

  decreaseQuantity() {
    this.quantity = this.quantity > 1 ? this.quantity - 1 : this.quantity;
  }
}
