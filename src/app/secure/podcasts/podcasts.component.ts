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
  loading = true;
  error = false;
  errorMessage = 'Podcast Error:';

  constructor(
    private podcastService: PodcastService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.user().subscribe((res) => {
      this.user = res;
    });
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
      this.loading = false;
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

  setError() {
    this.error = true;

    setTimeout(() => {
      this.error = false;
      this.errorMessage = '';
    }, 3000);
  }

  handleCreatePodcast() {
    this.creatingNewPodcast = true;
    const newPodcastData = this.form.getRawValue();

    this.podcastService.create(newPodcastData).subscribe(
      (res) => {
        this.podcastService.all().subscribe((res: any) => {
          this.podcasts = res;
          this.resetAdd();
          this.setShowAdd(false);
        });
      },
      (err) => {
        if (err.error.errors) {
          let errorMessages = err.error.errors;

          this.errorMessage += errorMessages.title
            ? errorMessages.title[0]
            : '';
          this.errorMessage += errorMessages.artwork
            ? errorMessages.artwork[0]
            : '';
        }
        this.setError();
        this.creatingNewPodcast = false;
      }
    );
  }

  handleEditPodcast() {
    this.creatingNewPodcast = true;
    const updateData = this.editForm.getRawValue();

    this.podcastService.update(this.selectedPodcast.id, updateData).subscribe(
      (res) => {
        this.podcastService.all().subscribe((res: any) => {
          this.podcasts = res;
          this.resetEdit();
          this.setShowEdit(false);
        });
      },
      (err) => {
        if (err.error.errors) {
          let errorMessages = err.error.errors;

          this.errorMessage += errorMessages.title
            ? errorMessages.title[0]
            : '';
          this.errorMessage += errorMessages.artwork
            ? errorMessages.artwork[0]
            : '';
        }
        this.setError();
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

  setAsFavorite(podcast) {
    let temp = [...this.podcasts];
    let findIndex = temp.findIndex((item) => item.id === podcast.id);
    if (findIndex) {
      temp[findIndex].favorite = true;
      this.podcasts = temp;
    }
    this.podcastService.setUserFavorite(this.user.id, podcast.id).subscribe();
  }
}
