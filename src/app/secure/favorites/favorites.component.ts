import { Component, OnInit } from '@angular/core';
import { PodcastService } from 'src/app/services/podcast.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  user = null;
  podcasts = null;
  loading = true;

  constructor(
    private podcastService: PodcastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user().subscribe((res: any) => {
      this.user = res;

      this.podcastService.getUserFavorite(res.id).subscribe((favRes) => {
        this.podcasts = favRes;
        this.loading = false;
      });
    });
  }

  setAsFavorite() {}

  removeFavorite(podcast) {
    let removeIndex = this.podcasts.findIndex((item) => item.id === podcast.id);
    if (removeIndex > -1) {
      let temp = [...this.podcasts];
      temp.splice(removeIndex, 1);
      this.podcasts = temp;
    }
    this.podcastService.removeUserFavorite(this.user.id, podcast.id);
  }
}
