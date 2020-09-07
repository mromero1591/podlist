import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loggingIn = false;
  error = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  setError() {
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  handleLogin() {
    this.loggingIn = true;
    const loginData = this.form.getRawValue();

    this.authService.login(loginData.email, loginData.password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.user.id);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.setError();
        this.loggingIn = false;
      }
    );
  }
}
