import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    private authService: AuthService
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
        (res) => {
          console.log(res);
        },
        (err) => {
          this.loggingIn = false;
        }
      );
  }
}
