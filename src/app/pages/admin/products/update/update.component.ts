import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, CommonModule, ToastModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  providers: [MessageService]
})
export class UpdateComponent implements OnInit {
  categories: any[] = [];
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  messageService = inject(MessageService);

  productId!: number | string | undefined;

  updateProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.productService.getAllcateGory().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });

    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          this.updateProductForm.patchValue(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  handleSubmit() {
    if (this.updateProductForm.invalid) {
      this.updateProductForm.markAllAsTouched();
      return;
    }

    if (!this.productId) return;
    this.productService.updateProduct(this.productId, this.updateProductForm.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật sản phẩm thành công!' });
        setTimeout(() => this.router.navigate(['/admin/products/list']), 2000);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Cập nhật sản phẩm thất bại!' });
        console.error(error.message);
      },
    });
  }
}
