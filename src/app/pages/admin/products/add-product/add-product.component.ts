import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Categories} from '../../../../interface/product';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor,ToastModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [MessageService]
})
export class AddProductComponent {
  productService = inject(ProductService);
  router = inject(Router)
  messageService = inject(MessageService)
  categories: Categories[] = [];


  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  
  ngOnInit() {
    this.productService.getAllcateGory().subscribe(categories => {
      this.categories = categories;
    });
  }

  handleSubmit() {
    if (this.addProductForm.valid) {
      this.productService.addProduct(this.addProductForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm sản phẩm thành công!' });
          setTimeout(() => this.router.navigate(['/admin/products/list']), 2000);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Thêm sản phẩm thất bại!' });
          console.error(error.message);
        },
      });
    } else {
      this.addProductForm.markAllAsTouched();
    }
  }
}
