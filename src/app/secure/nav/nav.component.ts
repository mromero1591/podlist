import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input('user') user: User = null;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
