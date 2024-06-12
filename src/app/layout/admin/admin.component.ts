import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ProductListComponent } from '../../pages/admin/products/list/list.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ErrorComponent } from '../../components/error/error.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,HeaderComponent, DashboardComponent, ProductListComponent, FooterComponent,ErrorComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminLayoutComponent {

}
