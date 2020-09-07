import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loggingIn = false;
  error = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    });
  }

  setError() {
    this.error = true;

    setTimeout(() => {
      this.error = false;
      this.errorMessage = '';
    }, 3000);
  }

  handleRegisterSubmit() {
    this.loggingIn = true;
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    } = this.form.getRawValue();

    this.authService
      .register(first_name, last_name, email, password, confirm_password)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.id);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          if (err.error.errors) {
            let errorMessages = err.error.errors;

            this.errorMessage += errorMessages.first_name
              ? errorMessages.first_name[0]
              : '';
            this.errorMessage += errorMessages.last_name
              ? errorMessages.last_name[0]
              : '';
            this.errorMessage += errorMessages.email
              ? errorMessages.email[0]
              : '';
            this.errorMessage += errorMessages.password
              ? errorMessages.password[0]
              : '';
            this.errorMessage += errorMessages.confirm_password
              ? errorMessages.confirm_password[0]
              : '';
          }
          this.setError();
          this.loggingIn = false;
        }
      );
  }
}
