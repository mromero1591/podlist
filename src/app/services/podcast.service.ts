import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Podcast {
  id: Number;
  title: string;
  description: string;
  created_at: Date;
  update_at: Date;
}

interface SearchResults {
  data: Array<Podcast>;
}

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  podCasts = null;
  favPodcast = null;

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<SearchResults>(`${environment.api}/podcast`);
  }

  create(newPodcast) {
    return this.http.post(`${environment.api}/podcast`, newPodcast);
  }
  update(id, updatedPodcast) {
    return this.http.put(`${environment.api}/podcast/${id}`, updatedPodcast);
  }
  delete(id) {
    return this.http.delete(`${environment.api}/podcast/${id}`);
  }

  getUserFavorite(id) {
    return this.http.get(`${environment.api}/podcast/favorite/${id}`);
  }

  setUserFavorite(user_id, podcast_id) {
    return this.http.post(`${environment.api}/podcast/favorite`, {
      user_id: user_id,
      podcast_id: podcast_id,
    });
  }
  removeUserFavorite(user_id, podcast_id) {
    return this.http.post(`${environment.api}/podcast/favorite/remove`, {
      user_id: user_id,
      podcast_id: podcast_id,
    });
  }
}
