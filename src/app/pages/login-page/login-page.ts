import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { SweetAlertService } from '../../services/swal-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styles: ``
})
export class LoginPage {

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  swal = inject(SweetAlertService);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login(){

    if (this.loginForm.valid) {

      this.swal.swalProcessingRequest();
      Swal.showLoading();

      const { email, password } = this.loginForm.value;

      this.authService.login(email!, password!, (success, msg) => {

        if (success) {
          this.swal.swalSuccess('Success', msg);
        } else {
          this.swal.swalError('Error', msg);
        }
      });
    }
  }

  getControlErrors(controlName: string): string | null {

    const control = this.loginForm.get(controlName);

    if (control && control.invalid && (control.dirty || control.touched)) {

      if (control.errors?.['required']) {
        return 'This field is required';
      } else if (control.errors?.['email']) {
        return 'Please enter a valid email address';
      } else if (control.errors?.['minlength']) {
        return 'Password must be at least 6 characters long';
      }
    }

    return null;
  }


}
