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

  handleLogin() {
    this.loggingIn = true;
    const loginData = this.form.getRawValue();

    this.authService.login(loginData.email, loginData.password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.user.id);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.loggingIn = false;
      }
    );
  }
}
