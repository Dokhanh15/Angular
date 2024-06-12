import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductListComponent } from '../../pages/admin/products/list/list.component';
import { RouterOutlet } from '@angular/router';
import { ListProductComponent } from '../../pages/public/list-product/list-product.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ErrorComponent } from '../../components/error/error.component';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductListComponent, RouterOutlet, ListProductComponent,ErrorComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {

}
