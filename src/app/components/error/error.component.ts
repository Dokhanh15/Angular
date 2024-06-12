import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

  errorMessage: string | null = null;

  constructor(private errorDialogService: ErrorService) { }

  ngOnInit(): void {
    this.errorDialogService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
  }

  close(): void {
    this.errorMessage = null;
    this.errorDialogService.clearError();
  }
}
