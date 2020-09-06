import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Podcast {
  id: Number;
  title: string;
  description: string;
  created_at: Date;
  update_at: Date;
}

interface SearchResults {
  current_page: number;
  data: Array<Podcast>;
}

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  podCasts = null;

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<SearchResults>('http://localhost:8000/api/podcast');
  }
}
