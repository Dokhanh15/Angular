import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ProductService } from '../../../../services/product.service';
import { Listpro } from './../../../../interface/product';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgFor,
    FormsModule,
    HeaderComponent,
    NgStyle,
    RouterLink,
    NgxPaginationModule,
    ToastModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  providers:[MessageService]
})
export class ProductListComponent {
  products: Listpro[] = [];
  productServices = inject(ProductService);
  messageService = inject(MessageService)
  showImages: boolean = true;
  constructor() {}
  listProduct: Listpro[] = [];
  private _filterValue: string = '';
  p: number = 1; // Biến để theo dõi trang hiện tại

  ngOnInit() {
    this.productServices.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.listProduct = this.products;
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
  //delete
  handleDeleteProduct(id: number) {
      if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này chứ?')) {
        this.productServices.deleteProduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(
              (product) => product.id !== id
            );
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa sản phẩm thành công!' });
          },
          error: (error) => {
            console.error(error.message);
            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Xóa sản phẩm thất bại!' });
          },
        });
      }

    
  }

  ngDoCheck() {
    console.log('products', this.products);
  }


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

  toggleImageVisibility(): void {
    this.showImages = !this.showImages;
  }


}

