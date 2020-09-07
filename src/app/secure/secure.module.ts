import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SecureComponent,
    NavComponent,
    DashboardComponent,
    FavoritesComponent,
    PodcastsComponent,
  ],
  exports: [SecureComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SecureModule {}
