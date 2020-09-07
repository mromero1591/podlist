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
          this.loggingIn = false;
        }
      );
  }
}
