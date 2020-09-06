import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [SecureComponent, NavComponent, DashboardComponent, FavoritesComponent],
  exports: [SecureComponent],
  imports: [CommonModule, RouterModule],
})
export class SecureModule {}
