import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
//import { PodcastService } from '../services/podcast.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss'],
})
export class SecureComponent implements OnInit {
  user: User;
  podcasts = null;
  //constructor(private podcastService: PodcastService) {}
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.token) {
      this.authService.user().subscribe(
        (res: any) => {
          this.user = res;
          console.log(res);
        },
        (error) => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }

    // this.podcastService.all().subscribe((data) => {
    //   this.podcasts = data.data;
    //   console.log(data);
    // });
  }
}
