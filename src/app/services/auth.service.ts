import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post(`${environment.api}/login`, {
      email: email,
      password: password,
    });
  }

  register(first_name, last_name, email, password, confirm_password) {
    return this.http.post(`${environment.api}/register`, {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    });
  }

  user() {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // });
    return this.http.get(
      `${environment.api}/users/${localStorage.getItem('token')}`
    );
  }
}
