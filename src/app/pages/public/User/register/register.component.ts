import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,ToastModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService]
})
export class RegisterComponent  {
  registerForm: FormGroup;
  messageService = inject(MessageService)

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }



  checkPasswords(group: AbstractControl) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng ký thành công!' });
          setTimeout(() => { this.router.navigate(['/login'])}, 1000);
          console.log('Đăng ký thành công', response);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Đăng ký thất bại!' });
          console.error('Đăng ký thất bại', error);
        }
      });
    }
  }
}
