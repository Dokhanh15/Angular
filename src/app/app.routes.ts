import { Routes } from '@angular/router';
import { adminGuardGuard } from './admin-guard.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminLayoutComponent } from './layout/admin/admin.component';
import { PublicComponent } from './layout/public/public.component';
import { AddProductComponent } from './pages/admin/products/add-product/add-product.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { UpdateComponent } from './pages/admin/products/update/update.component';
import { UserListComponent } from './pages/admin/products/user/user.component';
import { LoginComponent } from './pages/public/User/login/login.component';
import { RegisterComponent } from './pages/public/User/register/register.component';
import { DetailComponent } from './pages/public/detail/detail.component';
import { ListProductComponent } from './pages/public/list-product/list-product.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent, canActivate: [adminGuardGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products/list',
      },
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'product/add',
        component: AddProductComponent,
      },
      {
        path: 'product/edit/:id',
        component: UpdateComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      }
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: ListProductComponent,
      },
      {
        path: 'product/:id',
        component: DetailComponent,
      },
      {
        path: 'search',
        component: DetailComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
