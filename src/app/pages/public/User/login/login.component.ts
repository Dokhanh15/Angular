import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService)

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token',response.accessToken)
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công!' });
          setTimeout(() => { this.router.navigate(['/admin'])}, 1000);
          console.log('Đăng nhập thành công',response);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đăng nhập thất bại!' });
          console.error('Đăng nhập thất bại', error);
        }
      });
    }
  }
}
