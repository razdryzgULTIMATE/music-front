import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {IAlbum} from '../../../interfaces/IAlbum';
import {DatePipe, formatDate} from '@angular/common';
import {AlbumService} from '../../../services/album/album.service';
import {AdminModalComponent} from '../admin-modal/admin-modal.component';

@Component({
  selector: 'app-admin-album',
  imports: [ReactiveFormsModule, DatePipe, AdminModalComponent],
  templateUrl: './admin-album.component.html',
  styleUrl: './admin-album.component.css',
  standalone: true
})
export class AdminAlbumComponent {
  private fb = inject(FormBuilder);
  private albumService = inject(AlbumService);

  albums: IAlbum[] = [];
  showModal = signal(false);
  modalTitle = signal('Добавить альбом');
  currentAlbumId = signal<number | null>(null);

  formFields = [
    {name: 'title', label: 'Название', type: 'text', required: true},
    {name: 'releaseDate', label: 'Дата выхода', type: 'date', required: true},
    {name: 'genreId', label: 'Id жанра', type: 'number', required: true},
    {name: 'tags', label: "Теги", type: 'text', required: false},
    {name: 'artistIds', label: "Артисты", type: "text", required: true},
    {name: 'cover', label: 'Обложка', type: 'url', required: false}
  ];

  albumForm = this.fb.group({
    title: ['', Validators.required],
    releaseDate: ['', Validators.required],
    genreId: [0, Validators.required],
    tags: [''],
    artistIds: ['', Validators.required],
    cover: ['']
  });

  openAdd() {
    this.modalTitle.set('Добавить альбом');
    this.currentAlbumId.set(null);
    this.albumForm.reset();
    this.showModal.set(true);
  }

  openEdit(album: IAlbum) {
    this.modalTitle.set('Редактировать альбом');
    this.currentAlbumId.set(album.id);
    this.albumForm.patchValue({
      title: album.title,
      genreId: album.genre.id,
      tags: album.tags.toString(),

      releaseDate: formatDate(album.releaseDate, 'yyyy-MM-dd', 'en'),
      cover: album.cover
    });
    this.showModal.set(true);
  }

  saveAlbum() {
    if (this.albumForm.invalid) return;


    this.closeModal();
  }

  deleteAlbum(id: number) {
    if (confirm('Удалить альбом?')) {
      this.albumService.deleteAlbum(id);
    }
  }

  closeModal() {
    this.showModal.set(false);
  }
}
