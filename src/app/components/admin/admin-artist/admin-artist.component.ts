import {Component, inject, signal} from '@angular/core';
import {IArtist} from '../../../interfaces/IArtist';
import {IArtistExtended} from '../../../interfaces/IArtistExtended';
import {FormBuilder, Validators} from '@angular/forms';
import {IReviewRequest} from '../../../interfaces/IReview';
import {ArtistService} from '../../../services/artist/artist.service';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';

@Component({
  selector: 'app-admin-artist',
  imports: [AdminModalComponent],
  templateUrl: './admin-artist.component.html',
  standalone: true,
  styleUrl: '../admin-album/admin-album.component.css'
})
export class AdminArtistComponent {
  artists: IArtist[] = []
  private artistService = inject(ArtistService)
  private fb = inject(FormBuilder);
  showModal = signal(false);
  modalTitle = signal('Добавить отзыв');
  currentGenreId = signal<number | null>(null);
  formFields = [
    {name: 'name', label: 'Название', type: 'text', required: true},
  ];
  artistForm = this.fb.group({
    name: ['', Validators.required],
    id: [0],
  });

  ngOnInit(): void {
    this.artistService.getArtists().subscribe(data => this.artists.push(...data))
  }

  openAdd() {
    this.modalTitle.set('Добавить отзыв');
    this.currentGenreId.set(null);
    this.artistForm.reset();
    this.showModal.set(true);
  }

  openEdit(a: IArtist) {
    this.modalTitle.set('Редактировать отзыв');
    this.currentGenreId.set(a.id);
    this.artistForm.patchValue({
      name: a.name,
      id: a.id
    })
    this.showModal.set(true);
  }

  save() {
    if (this.artistForm.invalid) return;
    console.log(this.artistForm.value)
    const a: IArtist = {
      id: this.artistForm.value.id!,
      name: this.artistForm.value.name!,
    }
    this.artistService.createArtist(a).subscribe(data => this.artists.push(data))
    this.closeModal();
  }

  delete(id: number) {
    if (confirm('Удалить отзыв?')) {
      this.artistService.deleteArtist(id).subscribe()
      this.artists = this.artists.filter(a => a.id !== id)
    }
  }

  closeModal() {
    this.showModal.set(false);
  }



}
