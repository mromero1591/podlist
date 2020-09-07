import { Component, OnInit } from '@angular/core';
import { PodcastService } from 'src/app/services/podcast.service';

import { Auth } from 'src/app/auth';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;

  user = null;
  podcasts = [];
  selectedPodcast = null;
  showAdd = false;
  creatingNewPodcast = false;
  deletingPodcast = false;
  showEdit = false;

  constructor(
    private podcastService: PodcastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      artwork: '',
    });
    this.editForm = this.formBuilder.group({
      title: '',
      description: '',
      artwork: '',
    });
    this.podcastService.all().subscribe((res: any) => {
      this.podcasts = res;
    });
  }

  handleShowOptions(podcast) {
    this.editForm = this.formBuilder.group({
      title: podcast.title,
      description: podcast.description,
      artwork: podcast.artwork,
    });
    this.selectedPodcast = podcast;
    this.setShowEdit(true);
  }

  setShowAdd(toggle) {
    this.showAdd = toggle;
  }

  setShowEdit(toggle) {
    this.showEdit = toggle;
  }

  resetAdd() {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      artwork: '',
    });
    this.creatingNewPodcast = false;
  }

  resetEdit() {
    this.editForm = this.formBuilder.group({
      title: '',
      description: '',
      artwork: '',
    });
    this.creatingNewPodcast = false;
    this.setShowEdit(false);
  }

  handleCreatePodcast() {
    this.creatingNewPodcast = true;
    const newPodcastData = this.form.getRawValue();
    console.log(newPodcastData);
    this.podcastService.create(newPodcastData).subscribe(
      (res) => {
        this.podcastService.all().subscribe((res: any) => {
          this.podcasts = res;
          this.resetAdd();
          this.setShowAdd(false);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleEditPodcast() {
    this.creatingNewPodcast = true;
    const updateData = this.editForm.getRawValue();
    console.log(updateData);
    this.podcastService.update(this.selectedPodcast.id, updateData).subscribe(
      (res) => {
        this.podcastService.all().subscribe((res: any) => {
          this.podcasts = res;
          this.resetEdit();
          this.setShowEdit(false);
        });
      },
      (err) => {
        this.creatingNewPodcast = false;
      }
    );
  }

  handleDelete() {
    this.deletingPodcast = true;
    this.podcastService.delete(this.selectedPodcast.id).subscribe(
      (res) => {
        this.podcastService.all().subscribe((res: any) => {
          this.podcasts = res;
          this.resetEdit();
          this.setShowEdit(false);
          this.deletingPodcast = false;
        });
      },
      (err) => {
        this.deletingPodcast = false;
      }
    );
  }
}
