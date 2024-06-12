import { UsersService } from './../../../../services/users.service';
import { TableModule } from 'primeng/table';
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from '../../../../interface/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    ToastModule,
    TableModule,
    NgxPaginationModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [MessageService],
})
export class UserListComponent {
  userService = inject(UsersService);
  messageService = inject(MessageService);
  p: number = 1;
  users: any[] = [];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Failed to load users', error);
      },
    });
  }

  deleteUser(id: number) {

      if (window.confirm( 'Bạn chắc chắn muốn xóa sản phẩm này chứ?')) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.id !== id );
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Xóa tài khoản thành công!',
            });
            this.loadUsers(); // Refresh user list
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Xóa tài khoản không thành công!',
            });
            console.error('Failed to delete user', error);
          },
        });
      }
  }
}
