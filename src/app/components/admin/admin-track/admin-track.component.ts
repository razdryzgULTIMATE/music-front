import {Component, inject, OnInit, signal} from '@angular/core';
import {ITrack} from '../../../interfaces/ITrack';
import {FormBuilder, Validators} from '@angular/forms';
import {TrackService} from '../../../services/track/track.service';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';

@Component({
  selector: 'app-admin-track',
  imports: [AdminModalComponent],
  templateUrl: './admin-track.component.html',
  styleUrl: '../admin-album/admin-album.component.css'
})
export class AdminTrackComponent implements OnInit {
  tracks: ITrack[] = []
  private trackService = inject(TrackService)
  private fb = inject(FormBuilder);
  showModal = signal(false);
  modalTitle = signal('Добавить трек');
  currentGenreId = signal<number | null>(null);
  formFields = [
    {name: 'title', label: 'Название', type: 'text', required: true},
    {name: 'albumId', label: "Id альбома", type: 'number', required: true}
    // {name: 'id', label: 'Id жанра', type: 'number', required: false},
  ];
  trackForm = this.fb.group({
    title: ['', Validators.required],
    id: [0],
    albumId: [0]
  });

  ngOnInit(): void {
    this.trackService.getAll().subscribe(data => this.tracks.push(...data))
  }


  openAdd() {
    this.modalTitle.set('Добавить трек');
    this.currentGenreId.set(null);
    this.trackForm.reset();
    this.showModal.set(true);
  }

  openEdit(track: ITrack) {
    this.modalTitle.set('Редактировать трек');
    this.currentGenreId.set(track.id);
    this.trackForm.patchValue({
      title: track.title,
      id: track.id,
      albumId: track.albumId
    })
    this.showModal.set(true);
  }

  saveTrack() {
    if (this.trackForm.invalid) return;
    console.log(this.trackForm.value)
    const t: ITrack = {
      albumId: this.trackForm.value.albumId!,
      id: this.trackForm.value.id!,
      title: this.trackForm.value.title!
    }
    this.trackService.createTrack(t).subscribe(data => this.tracks.push(data))
    this.closeModal();
  }

  deleteTrack(id: number) {
    if (confirm('Удалить трек?')) {
      this.trackService.deleteTrack(id).subscribe()
      this.tracks = this.tracks.filter(t => t.id !== id)
    }
  }

  closeModal() {
    this.showModal.set(false);
  }
}
